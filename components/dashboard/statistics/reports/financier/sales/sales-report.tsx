import DashboardUserSelect from "@/components/dashboard/dasboard-user-select";
import DashboardYearSelect from "@/components/dashboard/dasboard-year-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import FinancierSalesChart from "./charts/sales-chart";

const FinancierSalesReport = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleSellerChange = (userId: string) => {
    setSelectedSeller(userId);
  };
  return (
    <Card>
      <CardHeader className="border-none p-6 pt-5 mb-0">
        <CardTitle className=" p-0 flex justify-between">
          <div className="text-lg font-semibold text-default-900">
            Financier Finance Report
          </div>
          <div className="flex items-center gap-2">
            <DashboardUserSelect onSellerChange={handleSellerChange} />
            <DashboardYearSelect onYearChange={handleYearChange} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FinancierSalesChart />
      </CardContent>
    </Card>
  );
};

export default FinancierSalesReport;
