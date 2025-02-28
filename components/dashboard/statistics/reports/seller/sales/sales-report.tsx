import DashboardUserSelect from "@/components/dashboard/dasboard-user-select";
import DashboardYearSelect from "@/components/dashboard/dasboard-year-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import SellerSalesChart from "./charts/sales-chart";

const SellerSalesReport: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);

  const handleSellerChange = (userId: string) => {
    setSelectedSeller(userId);
  };
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  return (
    <Card>
      <CardHeader className="border-none p-6 pt-5 mb-0 flex flex-col justify-between">
        <CardTitle className="text-lg font-semibold text-default-900">
          Seller Sales Report
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <DashboardUserSelect onSellerChange={handleSellerChange} />
          <DashboardYearSelect onYearChange={handleYearChange} />
        </div>
      </CardHeader>
      <CardContent>
        {selectedSeller && (
          <SellerSalesChart year={selectedYear} sellerId={selectedSeller} />
        )}
      </CardContent>
    </Card>
  );
};

export default SellerSalesReport;
