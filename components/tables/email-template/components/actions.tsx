import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { openPopup } from "@/service/modal.service";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import {
  fetchEmailTemplateById,
} from "@/service/email-template.service";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("EmailTemplatePage");

  const handleRecordDelete = async (uuid: string) => {
    
  };

  const handleOpenModal = async (uuid: string) => {
    try {
      const response: any = await fetchEmailTemplateById(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        await openPopup(
          "email-template",
          `${t("Edit")} ${t("Email Template")}`,
          "edit",
          response.data
        );
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleOpenModal(row.original.uuid)}
      >
        <Icon icon="heroicons:pencil" className="h-4 w-4" />
      </Button>
    </div>
  );
}
