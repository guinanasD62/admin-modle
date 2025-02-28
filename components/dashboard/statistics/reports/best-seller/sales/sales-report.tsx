import DashboardYearSelect from "@/components/dashboard/dasboard-year-select";
import DashboardCategorySelect from "@/components/dashboard/dashboard-category-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import BestSellerChart from "./charts/sales-chart";

const BestSellerReport = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Card>
      <CardHeader className="border-none p-6 pt-5 mb-0 flex flex-col justify-between">
        <CardTitle className="text-lg font-semibold text-default-900">
          Top 5 Best Seller Report
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <DashboardCategorySelect onCategoryChange={handleCategoryChange} />
          <DashboardYearSelect onYearChange={handleYearChange} />
        </div>
      </CardHeader>
      <CardContent>
        <BestSellerChart year={selectedYear} categoryId={selectedCategory} />
      </CardContent>
    </Card>
  );
};

export default BestSellerReport;
