import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { deleteIndustry, fetchIndustryById } from "@/service/industry.service";
import toast from "react-hot-toast";
import { openPopup } from "@/service/modal.service";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { deleteAttributeValue, fetchAttributeValueById } from "@/service/attribute-value.service";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("AttributeValuePage");

  const handleRecordDelete = async (uuid: string) => {
    try {
      const response: any = await deleteAttributeValue(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  const handleOpenModal = async (uuid: string) => {
    try {
      const response: any = await fetchAttributeValueById(uuid);
      if (response?.status === true && response?.statusCode === 200) {
        await openPopup('attribute-value', `${t('Edit')} ${t('Attribute Value')}`, 'edit', response.data);
      }
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
        onClick={() => handleOpenModal(row.original.uuid)}
      >
        <Icon icon="heroicons:pencil" className="h-4 w-4" />
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
