"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Info } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

// Function to calculate metrics
const calculateMetrics = (data: any[]) => {
  const n = data.length;
  let sumError = 0;
  let sumAbsPercentError = 0;
  let sumSquaredError = 0;
  let sumSquaredTotal = 0;
  const mean = data.reduce((acc, val) => acc + val.consumption, 0) / n;

  data.forEach((item) => {
    const error = item.prediction - item.consumption;
    sumError += Math.abs(error);
    sumAbsPercentError += Math.abs(error / item.consumption);
    sumSquaredError += error * error;
    sumSquaredTotal += (item.consumption - mean) * (item.consumption - mean);
  });

  const mae = sumError / n;
  const mape = (sumAbsPercentError / n) * 100;
  const r2 = 1 - sumSquaredError / sumSquaredTotal;

  return { mae, mape, r2 };
};

export function EnergyConsumptionChart() {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(2023, 11, 31),
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ mae: 0, mape: 0, r2: 0 });

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const newData = generateData(dateRange, activeTab);
      setChartData(newData);
      setMetrics(calculateMetrics(newData));
    }
  }, [dateRange, activeTab]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Energy Consumption Chart</CardTitle>
        <CardDescription>
          Toggle between hourly, daily, weekly, and monthly views
        </CardDescription>
      </CardHeader>
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
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#82ca9d"
              strokeDasharray="5 5"
              name="Prediction"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <MetricCard
            title="MAE"
            value={metrics.mae.toFixed(2)}
            description="Mean Absolute Error (MW)"
            tooltip="Average absolute difference between predicted and actual values"
          />
          <MetricCard
            title="MAPE"
            value={`${metrics.mape.toFixed(2)}%`}
            description="Mean Absolute Percentage Error"
            tooltip="Average percentage difference between predicted and actual values"
          />
          <MetricCard
            title="R²"
            value={metrics.r2.toFixed(4)}
            description="R-squared"
            tooltip="Proportion of the variance in the dependent variable that is predictable from the independent variable(s)"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  description,
  tooltip,
}: {
  title: string;
  value: string;
  description: string;
  tooltip: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center">
            {title}
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  );
}
