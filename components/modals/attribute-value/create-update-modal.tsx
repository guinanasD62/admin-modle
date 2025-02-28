import React, { useEffect } from "react";
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
import { createAttributeValue, updateAttributeValue } from "@/service/attribute-value.service";
import { closePopup } from "@/service/modal.service";
import { attributeValueSchema } from "@/validations";
import AttributeValueForm from "@/components/forms/attribute-value/create-update-form";

interface IModalProps {
    trans: any;
}

const CreateUpdateAttributeValueModal: React.FC<IModalProps> = ({ trans }) => {
    const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
        (state: RootState) => state.modal
    );
    const [isPending, startTransition] = React.useTransition();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
        control,
        clearErrors
    } = useForm({
        mode: "all",
        resolver: zodResolver(attributeValueSchema),
        defaultValues: {
            attribute_id: "",
            attribute_value_name: "",
        },
    });


    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (action === "edit") {
                if (data) {
                    setValue("attribute_id", data?.attribute?.uuid);
                    setValue("attribute_value_name", data?.attribute_value_name);
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

                if (action === "add") {
                    response = await createAttributeValue(payload);
                } else {
                    response = await updateAttributeValue(data?.uuid, payload);
                }

                if (response?.status === true && response?.statusCode === 200) {
                    reset();
                    toast.success(response?.message);
                    await closePopup();
                } else {
                    toast.error(response?.message || trans("An error occurred"));
                }
            } catch (error: any) {
                toast.error(error?.message || trans("An error occurred"));
            }
        });
    };

    const handleModalClose = async () => {
        reset();
        await closePopup();
    };

    return (
        <Dialog open={modalName === "attribute-value" && isOpen}>
            <DialogContent size="lg" handleModalClose={handleModalClose}>
                <DialogHeader className="p-0 mb-4">
                    <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        {modalTitle}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="h-[200px]">
                            <AttributeValueForm
                                trans={trans}
                                isPending={isPending}
                                register={register}
                                control={control}
                                errors={errors}
                            />
                        </div>
                        <div className=" flex justify-end gap-3 mt-6">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleModalClose}
                                >
                                    {trans('Cancel')}
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isPending ? trans("Loading") + '...' : action === 'add' ? trans('Save') : trans('Update')}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUpdateAttributeValueModal;
