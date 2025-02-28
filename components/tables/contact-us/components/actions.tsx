import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import {
  deleteContactUs,
} from "@/service/contact-us.service";
import { openPopup } from "@/service/modal.service";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("ContactUsPage");

  const handleRecordDelete = async (uuid: string) => {
    try {
      const response: any = await deleteContactUs(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleOpenModal = async (user_message: string) => {
    try {
      const payload : any = {
        user_message: user_message
      }
        await openPopup("contact_us", "User Message", "edit", payload);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleOpenDeleteModal = async (uuid: string) => {
    const payload: any = {
      uuid: uuid,
      handleRecordDelete,
    };
    await openPopup("", "", "delete", payload);
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleOpenModal(row.original.user_message)}
      >
        <Icon icon="heroicons:eye" className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleOpenDeleteModal(row.original.uuid)}
      >
        <Icon icon="heroicons:trash" className="h-4 w-4" />
      </Button>
    </div>
  );
}
