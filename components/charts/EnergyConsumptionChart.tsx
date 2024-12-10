"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", actual: 186, predicted: 190 },
  { month: "February", actual: 305, predicted: 280 },
  { month: "March", actual: 237, predicted: 250 },
  { month: "April", actual: 73, predicted: 220 },
  { month: "May", actual: 209, predicted: 200 },
  { month: "June", actual: 214, predicted: 230 },
  { month: "July", actual: null, predicted: 258 },
  { month: "August", actual: null, predicted: 298 },
  { month: "September", actual: null, predicted: 245 },
  { month: "October", actual: null, predicted: 287 },
  { month: "November", actual: null, predicted: 226 },
  { month: "December", actual: null, predicted: 319 },
];

const chartConfig = {
  actual: {
    label: "Actual Usage",
    color: "hsl(var(--chart-1))",
  },
  predicted: {
    label: "Predicted Usage",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EnergyConsumptionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Energy Consumption Overview
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Actual vs Predicted Consumption
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[13rem] aspect-auto">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="predicted"
              type="monotone"
              stroke="var(--color-predicted)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="actual"
              type="monotone"
              stroke="var(--color-actual)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
