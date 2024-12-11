"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CardHeader } from "@/components/CardHeader";
import { useChartStore } from "@/lib/stores/chartStore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { calculatePredictionMetrics } from "@/lib/data/utils/metrics";
import { fetchHourlyData } from "@/lib/data/utils";

interface MetricProps {
  label: string;
  value: number;
  max: number;
  unit: string;
}

const Metric = ({ label, value, max, unit }: MetricProps) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span className="font-medium">
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        / {max.toLocaleString()} {unit}
      </span>
    </div>
    <Progress value={(value / max) * 100} className="h-2" />
  </div>
);

export function PredictionMetrics() {
  const dateRange = useChartStore((state) => state.dateRange);
  const [metrics, setMetrics] = useState({
    mae: 0,
    rmse: 0,
    mape: 0,
    r2: 0,
  });

  useEffect(() => {
    async function calculateMetrics() {
      if (!dateRange?.from || !dateRange?.to) return;

      try {
        const data = await fetchHourlyData(dateRange.from, dateRange.to);
        const calculatedMetrics = calculatePredictionMetrics(data);
        setMetrics(calculatedMetrics);
      } catch (error) {
        console.error("Error calculating metrics:", error);
      }
    }

    calculateMetrics();
  }, [dateRange]);

  const formattedDateRange =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
          dateRange.to,
          "MMM d, yyyy",
        )}`
      : "No date range selected";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Prediction Metrics"
        description={`Date Range: ${formattedDateRange}`}
      />
      <CardContent className="flex-grow grid grid-cols-2 gap-4">
        <Metric label="MAE" value={metrics.mae} max={2000} unit="MW" />
        <Metric label="RMSE" value={metrics.rmse} max={2000} unit="MW" />
        <Metric label="MAPE" value={metrics.mape} max={10} unit="%" />
        <Metric label="R²" value={metrics.r2} max={1} unit="" />
      </CardContent>
    </Card>
  );
}
