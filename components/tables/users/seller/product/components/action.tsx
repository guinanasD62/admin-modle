import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";


interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const navigation = useRouter();

  const handleProductDetail = (slug: string) => {
    let navigateUrl = `/product/details?slug=${slug}`;
    navigation.push(navigateUrl);
  }

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleProductDetail(row.original.slug)}
      >
        <Icon icon="heroicons:eye" className="h-4 w-4" />
      </Button>
    </div>
  );
}
