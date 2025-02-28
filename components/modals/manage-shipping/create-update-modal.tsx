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
import { closePopup } from "@/service/modal.service";
import { manageShippingSchema } from "@/validations";
import { createShipping, updateShipping } from "@/service/manage-shipping.service";
import { ManageShippingForm } from "@/components/forms";



interface IModalProps {
  trans: any;
}

const CreateUpdateManageShippingModal: React.FC<IModalProps> = ({ trans }) => {
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
    watch
  } = useForm({
    mode: "all",
    resolver: zodResolver(manageShippingSchema), 
    defaultValues: {
      provider_name: "",
      rates: 0,
      service_area: "",
      shipping_method: "",
      api_key:"",
      is_active: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      clearErrors();
      if (action === "edit" && data) {
        setValue("provider_name", data.provider_name || "");
        setValue("rates", data.rates || "");
        setValue("service_area", data.service_area || ""); 
        setValue("shipping_method", data.shipping_method || ""); 
        setValue("api_key", data.api_key || "");
        setValue("is_active", data.is_active ?? true);
      } else {
        reset();
      }
    }   
  }, [data, setValue, isOpen, action, clearErrors, reset]);

  const onSubmit = async (payload: any) => {

    startTransition(async () => { 
      try {
        let response: any;
        if (action === "add") {
          response = await createShipping(payload);
        } else {
          response = await updateShipping(data?.uuid, payload);
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
    clearErrors();
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "shipping" && isOpen}>
      <DialogContent size="lg" hiddenCloseIcon={true}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"> 
            <div className="h-[450px]">
              <ManageShippingForm
                trans={trans}
                isPending={isPending}
                register={register}
                control={control}
                watch={watch}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                action={action}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
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

export default CreateUpdateManageShippingModal;

