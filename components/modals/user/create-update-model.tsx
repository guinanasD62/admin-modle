import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { closePopup } from "@/service/modal.service";
import { getS3BasePath } from "@/config/aws";
import AdminUserForm from "@/components/forms/user/create-update-form";
import adminUserSchema from "@/validations/user/adminUser.schema";
import { createSubAdmin } from "@/service/user.service";

type FileWithPreview = File & {
    preview: string;
};

interface IModalProps {
    trans: any;
}

const CreateUpdateAdminModal: React.FC<IModalProps> = ({ trans }) => {
    const AWS_URL = getS3BasePath();
    // `${AWS_URL}/admin/${row.original.id}/small/${row.original.image}`
    const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
        (state: RootState) => state.modal
    );
    const [file, setFile] = useState<FileWithPreview | null>(null);
    const [preview, setPreview] = useState<FileWithPreview | null>(null);
    const [isPending, startTransition] = React.useTransition();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
        setValue,
        clearErrors,
    } = useForm({
        mode: "all",
        resolver: zodResolver(adminUserSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            password: "",
            confirm_password: "",
            meta_title: "",
            meta_keywords: "",
            meta_description: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (action === "edit") {
                if (data) {
                    setValue("first_name", data?.first_name || "");
                    setValue("last_name", data?.last_name || "");
                    setValue("email", data?.email || "");
                    setValue("mobile_number", data?.mobile_number || "");
                    setValue("password", data?.password || "");
                    setValue("confirm_password", data?.confirm_password || "");
                    setValue("meta_title", data?.meta_title || "");
                    setValue("meta_keywords", data?.meta_keywords || "");
                    setValue("meta_description", data?.meta_description || "");
                    if (data?.image) {
                        const previewUrl = AWS_URL + `/admin/${data.id}/small/${data.image}`;
                        setPreview(previewUrl as any);
                    } else {
                        setPreview(null);
                    }
                }
            } else {
                reset();
            }
        }
    }, [isOpen, action, clearErrors, reset, data]);

    const onSubmit = async (payload: any) => {
        startTransition(async () => {
            try {
                let response: any;
                // Form validation
                if (payload.password !== payload.confirm_password) {
                    toast.error(trans("Passwords do not match"));
                    return;
                }

                if (action === "add") {
                    response = await createSubAdmin(payload)
                }
                if (response?.status === true && response?.statusCode === 200) {
                    reset();
                    toast.success(response?.message);
                    await closePopup();
                } else {
                    toast.error(response?.message || trans("An error occurred"));
                }

            } catch (error: any) {
                toast.error(error?.message || trans("An unexpected error occurred"));
            }
        });
    };

    useEffect(() => {
        if (action === "add") {
            setPreview(null);
            setFile(null);
        }
        if (action === "edit") {
            setFile(null);
        }
    }, [action]);

    const handleModalClose = async () => {
        reset();
        await closePopup();
    };
    return (
        <Dialog open={modalName === "admin" && isOpen}>
            <DialogContent className="w-auto max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] h-auto max-h-[50vw] p-6"
                handleModalClose={handleModalClose}>
                <DialogHeader className="p-0 mb-4">
                    <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        {modalTitle}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="h-[400px]">
                            <AdminUserForm
                                trans={trans}
                                isPending={isPending}
                                register={register}
                                control={control}
                                errors={errors}
                                file={file}
                                setFile={setFile}
                                preview={preview}
                                setPreview={setPreview}
                            />
                        </div>
                        <div className=" flex justify-end gap-3 mt-6">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleModalClose}
                                >
                                    {trans("Cancel")}
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isPending
                                    ? trans("Loading") + "..."
                                    : action === "add"
                                        ? trans("Save")
                                        : trans("Update")}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUpdateAdminModal;
