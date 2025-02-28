"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { SellerTable } from "@/components/tables";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { DeleteConfirmationModel } from "@/components/modals";

interface ISellerProps { }

const SellerList: React.FunctionComponent<ISellerProps> = () => {
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const t = useTranslations("SellerPage");
  const handleOpenModal = async () => { };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Seller")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Registered Seller")}
          </div>
          <div className="flex-none flex items-center justify-end gap-4"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <SellerTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
      <DeleteConfirmationModel />
    </div>
  );
};

export default SellerList;
