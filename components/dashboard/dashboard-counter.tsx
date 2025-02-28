"use client";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Application, Cart, User, Users } from "@/components/svg";
import { useEffect, useState } from "react";
import { fetchBuyerSellerCount } from "@/service/dashboard.service";
import { Loader2 } from "lucide-react";

const DashboardCounter: React.FC = () => {
  const [counterData, setCounterData] = useState({
    total_buyer: 0,
    total_seller: 0,
    total_financier: 0,
    totalRevenue: 0,
    supplierPercentageChangeSinceLastWeek: 0,
    buyerPercentageChangeSinceLastWeek: 0,
    financierPercentageChangeSinceLastWeek: 0,
    salesPercentageChangeSinceLastWeek: 0,
  });
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const loadCounterData = async () => {
    try {
      const response = await fetchBuyerSellerCount();
      if (response.status) {
        setCounterData({
          total_buyer: response.data.total_buyer || 0,
          total_seller: response.data.total_seller || 0,
          total_financier: response.data.total_financier || 0,
          totalRevenue: response.data.totalRevenue || 0,
          supplierPercentageChangeSinceLastWeek:
            response.data.supplierPercentageChangeSinceLastWeek || 0,
          buyerPercentageChangeSinceLastWeek:
            response.data.buyerPercentageChangeSinceLastWeek || 0,
          financierPercentageChangeSinceLastWeek:
            response.data.financierPercentageChangeSinceLastWeek || 0,
          salesPercentageChangeSinceLastWeek:
            response.data.salesPercentageChangeSinceLastWeek || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching buyer and seller count", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounterData();
  }, []);

  const getWeeklyPercentageStatus = (percentage: number) => {
    if (percentage > 0) {
      return {
        isUp: true,
        icon: "heroicons:arrow-trending-up-16-solid",
        colorClass: "text-success",
      };
    } else if (percentage < 0) {
      return {
        isUp: false,
        icon: "heroicons:arrow-trending-down-16-solid",
        colorClass: "text-destructive",
      };
    } else {
      return {
        isUp: null,
        icon: "heroicons:minus-16-solid",
        colorClass: "text-default-600",
      };
    }
  };

  const formatValue = (value: any) => {
    //format for two decimals, only if there are decimals
    if (typeof value === "number") {
      return value % 1 === 0
        ? value.toLocaleString()
        : value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    }
    return value;
  };
  const reports = [
    {
      id: 1,
      name: "Customers",
      count: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(counterData.total_buyer.toLocaleString())
      ),
      rate: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(
          `${formatValue(counterData.buyerPercentageChangeSinceLastWeek)}`
        )
      ),
      ...getWeeklyPercentageStatus(
        counterData.buyerPercentageChangeSinceLastWeek
      ),
      icon: <Cart className="h-6 w-6" />,
      color: "primary",
    },
    {
      id: 2,
      name: "Financiers",
      count: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(counterData.total_financier.toLocaleString())
      ),
      rate: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(
          `${formatValue(counterData.financierPercentageChangeSinceLastWeek)}`
        )
      ),
      ...getWeeklyPercentageStatus(
        counterData.financierPercentageChangeSinceLastWeek
      ),
      icon: <User className="h-6 w-6" />,
      color: "info",
    },
    {
      id: 3,
      name: "Suppliers",
      count: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(counterData.total_seller.toLocaleString())
      ),
      rate: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        `${formatValue(counterData.supplierPercentageChangeSinceLastWeek)}`
      ),
      ...getWeeklyPercentageStatus(
        counterData.supplierPercentageChangeSinceLastWeek
      ),
      icon: <Users className="h-6 w-6" />,
      color: "warning",
    },
    {
      id: 4,
      name: "Total Sales",
      count: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        `₹${formatValue(counterData.totalRevenue.toLocaleString())}`
      ),
      rate: loading ? (
        <Loader2 className="animate-spin h-6 w-6" />
      ) : (
        formatValue(
          `${formatValue(counterData.salesPercentageChangeSinceLastWeek)}`
        )
      ),
      ...getWeeklyPercentageStatus(
        counterData.salesPercentageChangeSinceLastWeek
      ),
      icon: <Application className="h-6 w-6" />,
      color: "destructive",
    },
  ];
  return (
    <>
      {reports.map((item, index) => (
        <Card key={`report-card-${index}`} className="h-full">
          <CardContent className="p-6 flex flex-col justify-between gap-4 shadow-2xl rounded-2xl h-full">
            {/* Top Section */}
            <div className="flex items-start gap-4">
              <div>
                <span
                  className={cn(
                    "flex-none h-12 w-12 flex justify-center items-center bg-default-100 rounded-md",
                    {
                      "bg-primary bg-opacity-10 text-primary":
                        item.color === "primary",
                      "bg-info bg-opacity-10 text-info": item.color === "info",
                      "bg-warning bg-opacity-10 text-warning":
                        item.color === "warning",
                      "bg-destructive bg-opacity-10 text-destructive":
                        item.color === "destructive",
                    }
                  )}
                >
                  {item.icon}
                </span>
              </div>
              <div className="space-y-3 flex-1">
                <div className="text-[14px] font-semibold text-default-900 truncate">
                  {item.name}
                </div>
                <div className="text-2xl font-extrabold text-primary truncate">
                  {item.count}
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex font-semibold gap-2 justify-start ml-12">
              {item.isUp === null ? (
                <>
                  <span className={item.colorClass}>{item.rate}%</span>
                  <Icon
                    icon="heroicons:minus-16-solid"
                    className={`${item.colorClass} text-xl`}
                  />
                </>
              ) : item.isUp ? (
                <>
                  <span className="text-success">{item.rate}%</span>
                  <Icon
                    icon="heroicons:arrow-trending-up-16-solid"
                    className="text-success text-xl"
                  />
                </>
              ) : (
                <>
                  <span className="text-destructive">{item.rate}%</span>
                  <Icon
                    icon="heroicons:arrow-trending-down-16-solid"
                    className="text-destructive text-xl"
                  />
                </>
              )}
              <div className="text-xs text-default-600">Since Last Week</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DashboardCounter;
