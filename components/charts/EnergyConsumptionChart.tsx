"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DateRange } from "react-day-picker";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";
import { DateRangePicker } from "@/components/DateRangePicker";

// Helper function to generate random consumption data
const generateRandomConsumption = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate prediction data (slightly different from actual data)
const generatePredictionData = (actualData: any[]) => {
  return actualData.map((item) => ({
    ...item,
    prediction: item.consumption + generateRandomConsumption(-20, 20),
  }));
};

// Function to generate data based on date range and interval
const generateData = (dateRange: DateRange, interval: string) => {
  if (!dateRange.from || !dateRange.to) return [];

  const start = startOfDay(dateRange.from);
  const end = endOfDay(dateRange.to);

  let data: any[];

  switch (interval) {
    case "hourly":
      data = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        consumption: generateRandomConsumption(50, 150),
      }));
      break;
    case "daily":
      data = eachDayOfInterval({ start, end }).map((date) => ({
        time: format(date, "MMM dd"),
        consumption: generateRandomConsumption(300, 800),
      }));
      break;
    case "weekly":
      data = eachWeekOfInterval({ start, end }).map((date) => ({
        time: `Week ${format(date, "w")}`,
        consumption: generateRandomConsumption(1500, 3500),
      }));
      break;
    case "monthly":
      data = eachMonthOfInterval({ start, end }).map((date) => ({
        time: format(date, "MMM yyyy"),
        consumption: generateRandomConsumption(5000, 15000),
      }));
      break;
    default:
      data = [];
  }

  return generatePredictionData(data);
};

export function EnergyConsumptionChart() {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const newData = generateData(dateRange, activeTab);
      setChartData(newData);
    }
  }, [dateRange, activeTab]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader
        title="Energy Consumption Chart"
        description="Toggle between hourly, daily, weekly, and monthly views"
      />
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" MW" />
            <Tooltip formatter={(value) => `${value} MW`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="hsl(var(--chart-2))"
              strokeDasharray="5 5"
              name="Prediction"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
