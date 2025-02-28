"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { openPopup } from "@/service/modal.service";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { ContactUsTable } from "../tables";
import { DeleteConfirmationModel, ViewContactUsModal } from "../modals";

interface IContactUsProps {}

const ContactUsList: React.FunctionComponent<IContactUsProps> = () => {
  const t = useTranslations("ContactUsPage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);

  return (
   <>
       <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
          <BreadcrumbItem>{t("Contact Us")}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            {t("Contact Us")}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="pt-6">
            <ContactUsTable key={String(refresh)} trans={t} />
          </CardContent>
        </Card>
      </div>
    </div>
    <ViewContactUsModal trans={t}/>
    <DeleteConfirmationModel/>
   </>
  );
};

export default ContactUsList;
