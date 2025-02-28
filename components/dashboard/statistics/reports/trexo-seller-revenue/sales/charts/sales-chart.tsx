"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  getGridConfig,
  getYAxisConfig,
  getLabel,
} from "@/lib/appex-chart-options";
import { useState, useEffect } from "react";
import {
  fetchSellerMonthWiseRevenue,
  fetchTrexoMonthwisePerSeller,
} from "@/service/dashboard.service";

interface BuyerSalesChartProps {
  height?: number;
  year: number;
  sellerId: string;
}

const SellerAndTrexoSalesChart: React.FC<BuyerSalesChartProps> = ({
  height = 300,
  year,
  sellerId,
}) => {
  const { theme: config, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const [series, setSeries] = useState([
    {
      name: "Seller Revenue",
      data: [],
    },
    {
      name: "TrexoPro Revenue",
      data: [],
    },
  ]);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch seller month-wise revenue and TrexoPro revenue for the selected year
  const loadRevenueData = async () => {
    try {
      // Fetch seller revenue
      const sellerResponse = await fetchSellerMonthWiseRevenue(
        sellerId,
        String(year)
      );
      const sellerMonths = sellerResponse.data.map((item: any) => item.month);
      const sellerValues = sellerResponse.data.map(
        (item: any) => item.value || 0
      );

      // Fetch TrexoPro revenue
      const trexoProResponse = await fetchTrexoMonthwisePerSeller( sellerId, String(year));
      const trexoProValues = trexoProResponse.data.map(
        (item: any) => item.value || 0
      );

      // Set categories to months
      setCategories(sellerMonths);

      // Update series with seller and TrexoPro revenue data
      setSeries([
        {
          name: "Seller Revenue",
          data: sellerValues,
        },
        {
          name: "TrexoPro Revenue",
          data: trexoProValues,
        },
      ]);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  useEffect(() => {
    if (sellerId) {
      loadRevenueData();
    }
  }, [year, sellerId]);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),

    yaxis: {
      ...getYAxisConfig(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      labels: {
        formatter: function (value: number) {
          return value.toFixed(2);
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 2,
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories,
      labels: getLabel(
        `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`
      ),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default SellerAndTrexoSalesChart;
