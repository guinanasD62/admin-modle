"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateUpdateEmailTemplateModal } from "@/components/modals";
import { openPopup } from "@/service/modal.service";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import EmailTemplateTable from "../tables/email-template/email-template-table";

interface IEmailTemplateProps { }

const EmailTemplateList: React.FunctionComponent<IEmailTemplateProps> = () => {
  const t = useTranslations("EmailTemplatePage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);
  const handleOpenModal = async () => {
    await openPopup(
      "email-template",
      `${t("Add")} ${t("Email Template")}`,
      "add"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Email Templates")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Email Templates")}
          </div>
          <div className="flex-none flex items-center justify-end gap-4">
            <CreateUpdateEmailTemplateModal trans={t} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <EmailTemplateTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailTemplateList;
