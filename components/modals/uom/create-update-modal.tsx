import React, { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { closePopup } from "@/service/modal.service";
import { UomForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { createUom, updateUom } from "@/service/uom.service";
import { uomSchema } from "@/validations";

interface IModalProps {
    trans: any;
}

const CreateUpdateUomModal: React.FC<IModalProps> = ({ trans }) => {
    const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
        (state: RootState) => state.modal
    );
    const [isPending, startTransition] = useTransition();
    const [roundingRule, setRoundingRule] = useState<any>();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
        control,
        clearErrors,
    } = useForm({
        mode: "all",
        resolver: zodResolver(uomSchema),
        defaultValues: {
            category_ids: "",
            uom_code: "",
            rounding_rule: "",
            rounding_value: "",
            decimal_scale: "",
            description: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (action === "edit") {
                if (data) {
                    setValue(
                        "category_ids",
                        data?.uom_category.map((item: any) => item.Category.uuid) || []
                    );
                    setValue("uom_code", data?.uom_code || "");
                    setValue("rounding_rule", data?.rounding_rule || "");
                    setValue("rounding_value", data?.rounding_value || "");
                    setValue("decimal_scale", data?.decimal_scale || "");
                    setValue("description", data?.description);
                    setRoundingRule(data?.rounding_rule || "");
                }
            } else {
                reset();
            }
        }
    }, [isOpen, action, clearErrors, reset, data]);

    const onSubmit = async (payload: any) => {
        startTransition(async () => {
            try {
                //Converting category ids in json.
                let categoryIds = payload.category_ids.split(",");
                payload.category_ids = JSON.stringify(categoryIds);
                //Converting decimal scale into number
                payload.decimal_scale = parseInt(payload.decimal_scale);
                let response: any;
                if (action === "add") {
                    response = await createUom(payload);
                } else {
                    response = await updateUom(data?.uuid, payload);
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

    //Function to close the model
    const handleModalClose = async () => {
        reset();
        setRoundingRule("");
        await closePopup();
    };

    return (
        <Dialog open={modalName === "uom" && isOpen}>
            <DialogContent size="2xl" handleModalClose={handleModalClose} className="max-h-[90vh] overflow-y-auto">
                <DialogHeader className="p-0 mb-4">
                    <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
                        {modalTitle}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="h-auto">
                            <UomForm
                                trans={trans}
                                isPending={isPending}
                                register={register}
                                control={control}
                                errors={errors}
                                roundingRule={roundingRule}
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

export default CreateUpdateUomModal;