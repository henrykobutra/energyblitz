"use client";

// React and core dependencies
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleDatePicker } from "@/components/SingleDatePicker";

// Chart Components
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

// Utils and Constants
import { DATA_START_DATE } from "@/lib/data/constants";
import {
  fetchHourlyData,
  fetchDailyData,
  fetchWeeklyData,
} from "@/lib/data/utils";
import {
  getTimeFormat,
  getDateRange,
  getMaxDate,
  getDaysToAdd,
} from "@/lib/chart/utils";

// Types
import { ConsumptionDataParsed } from "@/types/data";
import { TimeRange } from "@/types/enums";
import { useChartStore } from "@/lib/stores/chartStore";

interface ChartData {
  time: string;
  consumption: number;
  prediction: number;
}

export function EnergyConsumptionChart() {
  const { activeTab, dateRange, setActiveTab, setDateRange } = useChartStore();
  const [selectedDate, setSelectedDate] = useState<Date>(
    parseISO(DATA_START_DATE),
  );
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!dateRange?.from || !dateRange?.to) return;

      setIsLoading(true);
      try {
        let data: ConsumptionDataParsed[] = [];

        switch (activeTab) {
          case TimeRange.HOURS_48: // 48 Hours
            data = await fetchHourlyData(dateRange.from, dateRange.to);
            break;
          case TimeRange.DAYS_7: // 7 Days
            data = await fetchHourlyData(dateRange.from, dateRange.to);
            break;
          case TimeRange.DAYS_30: // 30 Days
            data = await fetchDailyData(dateRange.from, dateRange.to);
            break;
          case TimeRange.ALL_DATA: // All Data
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

  useEffect(() => {
    setDateRange(getDateRange(selectedDate, activeTab));
  }, [selectedDate, activeTab, setDateRange]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TimeRange);
    if (tab === TimeRange.ALL_DATA) {
      setSelectedDate(parseISO(DATA_START_DATE));
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader
        title="Energy Consumption Chart"
        description="Toggle between hourly, daily, weekly, and monthly views"
      />
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value={TimeRange.HOURS_48}>48 Hours</TabsTrigger>
              <TabsTrigger value={TimeRange.DAYS_7}>7 Days</TabsTrigger>
              <TabsTrigger value={TimeRange.DAYS_30}>30 Days</TabsTrigger>
              <TabsTrigger value={TimeRange.ALL_DATA}>All Data</TabsTrigger>
            </TabsList>
          </Tabs>
          <SingleDatePicker
            date={selectedDate}
            onDateChange={setSelectedDate}
            disabled={activeTab === TimeRange.ALL_DATA}
            fromDate={new Date(DATA_START_DATE)}
            toDate={getMaxDate(activeTab)}
            daysToAdd={getDaysToAdd(activeTab)}
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
