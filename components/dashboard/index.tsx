"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardSalutation from "./dasbboard-salutation";
import DashboardYearSelect from "./dasboard-year-select";
import DashboardCounter from "./dashboard-counter";
import SellerAndTrexoReport from "./statistics/reports/trexo-seller-revenue/sales/sales-report";
import SellerSalesReport from "./statistics/reports/seller/sales/sales-report";
import BestSellerReport from "./statistics/reports/best-seller/sales/sales-report";

interface IDashboardProps {}

const Dashboard = () => {
  const t = useTranslations("DashboardPage");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Handle year change from the DashboardYearSelect component
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-primary text-primary-foreground rounded-2xl p-10 pb-24">
        <DashboardSalutation trans={t} />
        <div className="flex items-center gap-2">
          <div className="opacity-80 text-xs">Download Report:</div>
          <div>
            <DashboardYearSelect onYearChange={handleYearChange} />
          </div>
          <button className="p-2 bg-primary text-primary-foreground border-secondary border rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 -mt-14 md:px-6">
        <DashboardCounter />
      </div>
      <div className="space-y-6 mt-10">
        <div className="flex items-center flex-wrap justify-between gap-4">
          <div className="text-2xl font-semibold text-default-800 pb-2 relative after:absolute after:h-0.5 after:rounded-md after:w-11 after:bg-primary after:left-0 after:bottom-0">
            Analytics {t("dashboard")}
          </div>
          {/* <DatePickerWithRange /> */}
        </div>
        <div className="grid grid-cols-12  gap-6 ">
          <div className="col-span-12 lg:col-span-8">
            {/* Sales Analytics */}
            {/* <SalesAnalytics /> */}
          </div>
          <div className="col-span-12 lg:col-span-4">
            {/* User Stats */}
            {/* <SellerCitySales /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SellerSalesReport />
          <BestSellerReport />
          {/* <FinancierSalesReport /> */}
          <SellerAndTrexoReport />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
