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
import { format, parseISO, addDays } from "date-fns";
import { DateRangePicker } from "@/components/DateRangePicker";
import { DATA_START_DATE } from "@/lib/data/constants";
import {
  fetchHourlyData,
  fetchDailyData,
  fetchWeeklyData,
} from "@/lib/data/utils";
import { ConsumptionDataParsed } from "@/types/data";

interface ChartData {
  time: string;
  consumption: number;
  prediction: number;
}

export function EnergyConsumptionChart() {
  const [activeTab, setActiveTab] = useState("daily");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: parseISO(DATA_START_DATE),
    to: addDays(parseISO(DATA_START_DATE), 6),
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!dateRange?.from || !dateRange?.to) return;

      setIsLoading(true);
      try {
        let data: ConsumptionDataParsed[] = [];

        switch (activeTab) {
          case "hourly": // 48 Hours
            data = await fetchHourlyData(dateRange.from, dateRange.to);
            break;
          case "daily": // 7 Days
            data = await fetchHourlyData(dateRange.from, dateRange.to);
            break;
          case "weekly": // 30 Days
            data = await fetchDailyData(dateRange.from, dateRange.to);
            break;
          case "monthly": // All Data
            data = await fetchWeeklyData(dateRange.from, dateRange.to);
            break;
        }

        const formattedData = data.map((item) => ({
          time: format(item.timestamp, getTimeFormat(activeTab)),
          consumption: item.PJME,
          prediction: item.Predicted_PJME,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [dateRange, activeTab]);

  const getTimeFormat = (tab: string) => {
    switch (tab) {
      case "hourly":
        return "HH:mm";
      case "daily":
        return "MMM dd HH:mm";
      case "weekly":
        return "MMM dd";
      case "monthly":
        return "'Week' w";
      default:
        return "MMM dd";
    }
  };

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
              <TabsTrigger value="hourly">48 Hours</TabsTrigger>
              <TabsTrigger value="daily">7 Days</TabsTrigger>
              <TabsTrigger value="weekly">30 Days</TabsTrigger>
              <TabsTrigger value="monthly">All Data</TabsTrigger>
            </TabsList>
          </Tabs>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            Loading...
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
