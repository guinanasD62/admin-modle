import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { TestimonialForm } from "@/components/forms";
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
import { createTestimonial, updateTestimonial } from "@/service/testimonial.service";
import { closePopup } from "@/service/modal.service";
import { testimonialSchema } from "@/validations";


interface IModalProps {
  trans: any;
}

const CreateUpdateTestimonialModal: React.FC<IModalProps> = ({ trans }) => {
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
  } = useForm({
    mode: "all",
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      customer_name: "",
      designation: "",
      rating: "",
      review: "",
      source_name: "",
      company_name: "",
      location_city: "",
      title: "",
      is_active: "false",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("customer_name", data?.customer_name);
      setValue("designation", data?.designation);
      setValue("rating", data?.rating);
      setValue("review", data?.review);
      setValue("source_name", data?.source_name);
      setValue("company_name", data?.company_name);
      setValue("location_city", data?.location_city);
      setValue("title", data?.title);
      setValue("is_active", String(data?.is_active));
    }
  }, [data]);

  const onSubmit = async (payload: any) => {
    startTransition(async () => {
      try {
        let response: any;

        if (action === "add") {
          response = await createTestimonial(payload);
        } else {
          response = await updateTestimonial(data?.uuid, payload);
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
    <Dialog open={modalName === "testimonial" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-[350px]">
              <TestimonialForm
                trans={trans}
                isPending={isPending}
                register={register}
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

export default CreateUpdateTestimonialModal;
