"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { AdminTable } from "@/components/tables";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { DeleteConfirmationModel } from "@/components/modals";
import { Button } from "@/components/ui/button";
import { openPopup } from "@/service/modal.service";
import { Icon } from "@iconify/react";
import CreateUpdateAdminModal from "@/components/modals/user/create-update-model";


interface IAdminProps { }

const AdminList: React.FunctionComponent<IAdminProps> = () => {
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const t = useTranslations("AdminUserPage");

  const handleOpenModal = async () => {
    await openPopup('admin', `${t('Add')} ${t('Admin')}`, 'add');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Admin")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Registered Admin")}
          </div>
          <div className="flex-none flex items-center justify-end gap-4">
            <Button onClick={handleOpenModal}>
              <Icon
                icon="heroicons:plus"
                className="w-5 h-5 ltr:mr-2 rtl:ml-2"
              />
              {t("Add New")}
            </Button>
            <CreateUpdateAdminModal trans={t} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <AdminTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
      <DeleteConfirmationModel />
    </div>
  );
};

export default AdminList;
