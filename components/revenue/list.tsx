"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";
import { RevenueTable } from "../tables";

interface IRevenueProps {}

const RevenueList: React.FunctionComponent<IRevenueProps> = () => {
  const t = useTranslations("RevenuePage");
  const { refresh } = useAppSelector((state: RootState) => state.datatable);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">{t("Dashboard")}</BreadcrumbItem>
            <BreadcrumbItem>{t("Revenue")}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="space-y-6">
          <div className="flex items-center flex-wrap justify-between gap-4">
            <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
              {t("Revenue")}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="pt-6">
              <RevenueTable key={String(refresh)} trans={t} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RevenueList;
