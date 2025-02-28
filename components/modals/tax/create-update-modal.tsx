import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { IndustryForm, TaxForm } from "@/components/forms";
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
import { createTax, updateTax } from "@/service/tax.service";
import { closePopup } from "@/service/modal.service";
import { taxSchema } from "@/validations";

interface IModalProps {
  trans: any;
}

const CreateUpdateTaxModal: React.FC<IModalProps> = ({ trans }) => {
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
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: zodResolver(taxSchema),
    defaultValues: {
      tax_name: "",
      description: "",
      tax_type: "",
      value_type: "",
      tax_value: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("tax_name", data?.tax_name);
      setValue("description", data?.description);
      setValue("tax_type", data?.tax_type);
      setValue("value_type", data?.value_type);
      setValue("tax_value", data?.tax_value);
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;

        if (action === "add") {
          response = await createTax(payload);
        } else {
          response = await updateTax(data?.uuid, payload);
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

  useEffect(() => {
    if (modalName === "tax" && isOpen) {
      clearErrors();
    }
  }, [isOpen, modalName]);
  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "tax" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[300px]">
              <TaxForm
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

export default CreateUpdateTaxModal;
