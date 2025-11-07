"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  DotProps,
} from "recharts";
import { FileDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const fullChartData = [
  { month: "Feb", value: 8500000, date: "2024-02" },
  { month: "Mar", value: 8800000, date: "2024-03" },
  { month: "Apr", value: 9000000, date: "2024-04" },
  { month: "May", value: 12000000, highlighted: true, date: "2024-05" },
  { month: "Jun", value: 11800000, date: "2024-06" },
  { month: "Jul", value: 12500000, highlighted: true, date: "2024-07" },
  { month: "Aug", value: 13000000, date: "2024-08" },
  { month: "Sep", value: 14000000, date: "2024-09" },
  { month: "Oct", value: 14500000, date: "2024-10" },
  { month: "Nov", value: 15000000, date: "2024-11" },
  { month: "Dec", value: 15200000, date: "2024-12" },
  { month: "Jan", value: 16000000, date: "2025-01" },
];

interface CashPickupChartProps {
  onExport?: () => void;
}

export function CashPickupChart({ onExport }: CashPickupChartProps) {
  const [timePeriod, setTimePeriod] = useState("12months");

  const getFilteredData = () => {
    switch (timePeriod) {
      case "7days":
        return fullChartData.slice(-1);
      case "30days":
        return fullChartData.slice(-2);
      case "6months":
        return fullChartData.slice(-6);
      case "12months":
      default:
        return fullChartData;
    }
  };

  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(2)}M`;
  };

  const exportToCSV = () => {
    const data = getFilteredData();

    // Calculate statistics
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const average = total / data.length;
    const max = Math.max(...data.map((item) => item.value));
    const min = Math.min(...data.map((item) => item.value));

    // Create CSV content
    let csvContent = "Cash Pickup Report\n";
    csvContent += `Period: ${timePeriod === "12months" ? "12 Months" : timePeriod === "6months" ? "6 Months" : timePeriod === "30days" ? "30 Days" : "7 Days"}\n`;
    csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;

    csvContent += "Summary Statistics\n";
    csvContent += `Total Cash Pickup:,${formatCurrency(total)}\n`;
    csvContent += `Average per Period:,${formatCurrency(average)}\n`;
    csvContent += `Highest:,${formatCurrency(max)}\n`;
    csvContent += `Lowest:,${formatCurrency(min)}\n\n`;

    csvContent += "Detailed Data\n";
    csvContent += "Month,Date,Amount (₦),Amount (Formatted)\n";

    data.forEach((item) => {
      csvContent += `${item.month},${item.date},${item.value},${formatCurrency(item.value)}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cash_pickup_report_${timePeriod}_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onExport?.();
  };

  const chartData = getFilteredData();

  return (
    <Card className="bg-white rounded-md border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h3 className="text-[11px] font-bold text-[#18181B]">
          Total Cash Pickup <br /> (Across Stores)
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "12 Months", value: "12months" },
            { label: "6 Months", value: "6months" },
            { label: "30 Days", value: "30days" },
            { label: "7 Days", value: "7days" },
          ].map((period) => (
            <Button
              key={period.value}
              variant={timePeriod === period.value ? "outline" : "ghost"}
              size="sm"
              onClick={() => setTimePeriod(period.value)}
              className={
                timePeriod === period.value
                  ? "text-[#18181B] border-[#000000]"
                  : "text-[#71717A]"
              }
            >
              {period.label}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          className="border-gray-300 text-[#71717A] hover:bg-gray-50 ml-auto md:ml-0 bg-transparent"
        >
          <FileDown className="h-4 w-4" /> Export Report
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DDD6FE" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#DDD6FE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="#F3F4F6"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F3F4F6",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area
            type="natural"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={(props: DotProps) => {
              const { cx, cy, payload } = props as DotProps & {
                payload?: { highlighted?: boolean };
              };
              if (payload?.highlighted) {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#8B5CF6"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                );
              }
              return <circle cx={cx} cy={cy} r={0} />;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
