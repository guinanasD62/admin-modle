"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreateUpdateUomModal,
  DeleteConfirmationModel,
} from "@/components/modals";
import { UomTable } from "@/components/tables";
import { openPopup } from "@/service/modal.service";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";

interface IUomProps { }

const UomList: React.FunctionComponent<IUomProps> = () => {
  const t = useTranslations("UomPage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const handleOpenModal = async () => {
    await openPopup("uom", `${t("Add")} ${t("UOM")}`, "add");
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
            <BreadcrumbItem>{t("UOM")}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="space-y-6">
          <div className="flex items-center flex-wrap justify-between gap-4">
            <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
              {t("UOM")}
            </div>
            <div className="flex-none flex items-center justify-end gap-4">
              <Button onClick={handleOpenModal}>
                <Icon
                  icon="heroicons:plus"
                  className="w-5 h-5 ltr:mr-2 rtl:ml-2"
                />
                {t("Add New")}
              </Button>
              <CreateUpdateUomModal trans={t} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="pt-6">
              <UomTable key={String(refresh)} trans={t} />
            </CardContent>
          </Card>
        </div>
      </div>
      <DeleteConfirmationModel />
    </>
  );
};

export default UomList;
