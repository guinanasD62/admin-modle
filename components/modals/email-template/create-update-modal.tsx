import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { EmailTemplateForm } from "@/components/forms";
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
import { emailTemplateSchema } from "@/validations";
import {
  updateEmailTemplate,
} from "@/service/email-template.service";

interface IModalProps {
  trans: any;
}

const CreateUpdateEmailTemplateModal: React.FC<IModalProps> = ({ trans }) => {
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
    trigger,
    watch,
    clearErrors,
    control,
  } = useForm({
    mode: "all",
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      template_name: "",
      subject: "",
      html_content: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("template_name", data?.template_name);
      setValue("subject", data?.subject);
      setValue("html_content", data?.html_content);
    }
  }, [data]);
  useEffect(() => {
    if (modalName === "email-template" && isOpen) {
      clearErrors();
    }
  }, [isOpen, modalName]);
  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;
        if (action === "add") {
        } else {
          response = await updateEmailTemplate(data?.uuid, payload);
        }

        if (response?.status === true && response?.statusCode === 200) {
          reset();
          toast.success(response?.message);
          await closePopup();
        } else {
          toast.error(response?.message || "An error occurred.");
        }
      } catch (error: any) {
        toast.error(error?.message || "An error occurred.");
      }
    });
  };

  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "email-template" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[335px]">
              <EmailTemplateForm
                trans={trans}
                isPending={isPending}
                register={register}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
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

export default CreateUpdateEmailTemplateModal;
