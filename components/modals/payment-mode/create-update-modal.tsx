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
import  PaymentModeSchema  from "@/validations/payment-mode/payment-mode.schema";
import { createPaymentMode, updatePaymentMode } from "@/service/payment-mode.service";
import PaymentModeForm from "@/components/forms/payment-mode/create-update-form";



interface IModalProps {
  trans: any;
}

const CreateUpdatePaymentModeModal: React.FC<IModalProps> = ({ trans }) => {
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
    watch,
    setError,
    resetField
  } = useForm({
    mode: "all",
    resolver: zodResolver(PaymentModeSchema), 
    defaultValues: {
      payment_methods: "",
      payment_providers: [],
      is_active: true,
    },
  });
  const selectedPaymentMethod = watch("payment_methods");


  useEffect(() => {
    
    if (isOpen) {
      clearErrors();
      if (action === "edit" && data) {
        setValue("payment_methods", data.payment_methods ?? true);
        setValue("payment_providers", data.payment_providers ?? true);
        setValue("is_active", data.is_active ?? true);
      } else {
        reset();
      }
    }   
  }, [data, setValue, isOpen, action, clearErrors, reset]);

  useEffect(() => {
    setValue("payment_providers", []);
    clearErrors("payment_providers");
  }, [selectedPaymentMethod, clearErrors, setValue]);

  

  const onSubmit = async (payload: any) => {
    startTransition(async () => { 
      try {     
        const paymentMethods = watch('payment_methods');
        const paymentProviders = watch('payment_providers');

        if (!paymentMethods) {
          setError('payment_methods', { message: 'Please select payment type' });
          return;
        }
  
        if (paymentMethods && (!paymentProviders || paymentProviders.length === 0)) {
          setError('payment_providers', { message: 'Please select payment provider' });
          return;
        }  
        let response: any;
        if (action === "add") {
          response = await createPaymentMode(payload); 
        } else {
          response = await updatePaymentMode(data?.uuid, payload); 
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
    <Dialog open={modalName === "payment-mode" && isOpen}>
      <DialogContent size="lg" hiddenCloseIcon={true}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"> 
            <div className="h-[450px]">
              <PaymentModeForm
                trans={trans}
                isPending={isPending}
                control={control}
                watch={watch}
                errors={errors}
                setValue={setValue}
                clearErrors={clearErrors}
                action={action}
                selectedPaymentMethod={selectedPaymentMethod}
                defaultValues={data}
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

export default CreateUpdatePaymentModeModal;
