"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { openPopup } from "@/service/modal.service";
import CreateUpdateManageShippingModal from "../modals/manage-shipping/create-update-modal";
import PaymentModeTable from "../tables/payment-mode/payment-mode-table";
import CreateUpdatePaymentModeModal from "../modals/payment-mode/create-update-modal";

interface IBrandProps { }

const PaymentModeList: React.FunctionComponent<IBrandProps> = () => {
  const t = useTranslations("PaymentModePage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);

  const handleOpenModal = async () => {

    await openPopup('payment-mode', `${t('Add')} ${t('Payment Mode')}`, 'add');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Payment Mode")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Payment Mode")}
          </div>
          <div className="flex-none flex items-center justify-end gap-4">
            <Button onClick={handleOpenModal}>
              <Icon
                icon="heroicons:plus"
                className="w-5 h-5 ltr:mr-2 rtl:ml-2"
              />
              {t("Add New")}
            </Button>
            <CreateUpdatePaymentModeModal trans={t} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <PaymentModeTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentModeList;
