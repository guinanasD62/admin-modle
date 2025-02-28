"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { useEffect, useState } from "react";
import { fetchBestSellerPieChart } from "@/service/dashboard.service";

interface BestSellerChartProps {
  height?: number;
  year: number;
  categoryId: string | null;
}

const BestSellerChart: React.FC<BestSellerChartProps> = ({
  height = 250,
  year,
  categoryId,
}) => {
  const { theme: config, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  // State to hold chart data
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Fetch the Best Seller Pie Chart data
  const loadBestSellerPieChartData = async () => {
    if (!categoryId) return; // If no category selected, do nothing

    try {
      const response = await fetchBestSellerPieChart(categoryId, String(year));
      if (response.status) {
        const chartData = response.data;
        const seriesData = chartData.datasets[0].data.map((value: string) => {
          // Handle 'NaN' string and convert to 0
          if (value === "NaN" || value === null || value === "") {
            return 0;
          }
          const parsedValue = parseFloat(value);
          return isNaN(parsedValue) ? 0 : parsedValue;
        });

        const total = seriesData.reduce((a: number, b: number) => a + b, 0);

        const updatedLabels = chartData.labels.map(
          (label: string, index: number) => {
            const percentage =
              total === 0 ? 0 : (seriesData[index] / total) * 100;
            return `${label} ${percentage.toFixed(2)}%`;
          }
        );

        setLabels(updatedLabels);
        setSeries(seriesData);
        setColors(chartData.datasets[0].backgroundColor);
      }
    } catch (error) {
      console.error("Error fetching Best Seller Pie Chart data:", error);
    }
  };
  useEffect(() => {
    loadBestSellerPieChartData();
  }, [year, categoryId]);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
      y: {
        formatter: (val: number) => `${isNaN(val) ? 0 : val.toFixed(2)}%`,
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "left",
      floating: false,
      labels: {
        colors:
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel,
        useSeriesColors: false,
      },
      itemMargin: {
        horizontal: 0,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
        },
      },
    ],
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      height={height}
      width={"100%"}
    />
  );
};

export default BestSellerChart;
