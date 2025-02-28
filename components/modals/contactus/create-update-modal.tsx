import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { closePopup } from "@/service/modal.service";
import { industrySchema } from "@/validations";

interface IModalProps {
  trans: any;
}

const ViewContactUsModal: React.FC<IModalProps> = ({ trans }) => {
  const { isOpen, modalName, modalTitle, action, data } = useAppSelector(
    (state: RootState) => state.modal
  );

  const {
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: zodResolver(industrySchema),
    defaultValues: {
      user_message: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("user_message", data);
    }
  }, [data, setValue]);

  useEffect(() => {
  }, [modalName, isOpen]);


  const handleModalClose = async () => {
    reset();
    await closePopup();
  };

  return (
    <Dialog open={modalName === "contact_us" && isOpen}>
      <DialogContent size="lg" handleModalClose={handleModalClose}>
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="font-medium pb-2 text-default-700 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {modalTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>{data?.user_message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewContactUsModal;
