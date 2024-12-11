"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CardHeader } from "@/components/CardHeader";
import { useChartStore } from "@/lib/stores/chartStore";
import { format } from "date-fns";

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
        {value.toFixed(2)} / {max} {unit}
      </span>
    </div>
    <Progress value={(value / max) * 100} className="h-2" />
  </div>
);

export function PredictionMetrics() {
  const dateRange = useChartStore((state) => state.dateRange);

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
        <Metric label="MAE" value={245.32} max={500} unit="kWh" />
        <Metric label="RMSE" value={312.18} max={600} unit="kWh" />
        <Metric label="MAPE" value={3.75} max={10} unit="%" />
        <Metric label="R2" value={0.92} max={1} unit="" />
      </CardContent>
    </Card>
  );
}
