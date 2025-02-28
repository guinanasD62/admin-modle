import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { openPopup } from "@/service/modal.service";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("FinancierPage");

  const handleRecordDelete = async (uuid: string) => {};

  const handleOpenModal = async (uuid: string) => {};

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
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleRecordDelete(row.original.uuid)}
      >
        <Icon icon="heroicons:trash" className="h-4 w-4" />
      </Button>
    </div>
  );
}
