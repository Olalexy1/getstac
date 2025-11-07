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
} from "recharts";
import { FileDown } from 'lucide-react';

const chartData = [
  { month: "Feb", value: 8000000 },
  { month: "Mar", value: 9200000 },
  { month: "Apr", value: 10500000 },
  { month: "May", value: 12800000, highlighted: true },
  { month: "Jun", value: 14200000 },
  { month: "Jul", value: 15800000 },
  { month: "Aug", value: 17200000 },
  { month: "Sep", value: 18500000 },
  { month: "Oct", value: 19800000 },
  { month: "Nov", value: 20500000 },
  { month: "Dec", value: 21200000 },
  { month: "Jan", value: 22000000 },
];

interface CashPickupChartProps {
  onExport?: () => void;
}

export function CashPickupChart({ onExport }: CashPickupChartProps) {
  const [timePeriod, setTimePeriod] = useState("12months");

  return (
    <div className="bg-white rounded-md border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h3 className="text-[11px] font-bold text-[#18181B]">
          Total Cash Pickup <br/> (Across Stores)
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
                  ? "text-[#18181B]"
                  : "text-[#71717A]"
              }
            >
              {period.label}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="border-gray-300 text-[#71717A] hover:bg-gray-50 ml-auto md:ml-0 bg-transparent"
          >
            <FileDown className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E9D5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E9D5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F3F4F6",
            }}
            formatter={(value: number) => `₦${(value / 1000000).toFixed(1)}M`}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#7C3AED"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
