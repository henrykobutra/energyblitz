"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface ConsumptionChartProps {
  data: Array<{
    month: string;
    desktop: number;
    mobile: number;
  }>;
}

const chartConfig = {
  desktop: {
    label: "Region 1",
    color: "#2563eb",
  },
  mobile: {
    label: "Region 2",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ConsumptionChart({ data }: ConsumptionChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] h-full w-full">
      <BarChart width={500} height={300} data={data} accessibilityLayer>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
