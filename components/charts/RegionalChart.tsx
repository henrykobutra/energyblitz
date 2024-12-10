"use client";

import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";
import { useState } from "react";

interface RegionData {
  name: string;
  value: number;
  fullName: string;
}

export function RegionalChart() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const data: RegionData[] = [
    { name: "AEP", value: 23450, fullName: "American Electric Power" },
    { name: "COMED", value: 18700, fullName: "Commonwealth Edison" },
    { name: "DAYTON", value: 3200, fullName: "Dayton Power & Light" },
    { name: "DEOK", value: 5100, fullName: "Duke Energy Ohio/Kentucky" },
    { name: "DOM", value: 19200, fullName: "Dominion Energy" },
    { name: "DUQ", value: 2800, fullName: "Duquesne Light Company" },
    { name: "EKPC", value: 2900, fullName: "East Kentucky Power Cooperative" },
    { name: "FE", value: 15600, fullName: "FirstEnergy" },
    { name: "NI", value: 8900, fullName: "Northern Illinois" },
    { name: "PJME", value: 28900, fullName: "PJM East" },
    { name: "PJMW", value: 21500, fullName: "PJM West" },
  ];

  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const transformedData = [
    {
      name: "Regions",
      ...sortedData.reduce(
        (acc, region) => ({
          ...acc,
          [region.name]: region.value,
        }),
        {},
      ),
    },
  ];

  // Create bars configuration using sortedData instead of data
  const bars = sortedData.map((region) => ({
    dataKey: region.name,
    fill: `hsl(var(--chart-${(sortedData.indexOf(region) % 10) + 1}))`,
    stackId: "regions",
    barSize: 20,
  }));

  return (
    <div className="w-full ">
      <h3 className="text-sm text-muted-foreground">
        Regional Network Distribution (MW)
      </h3>
      <ChartContainer config={{}} className="h-[80px] aspect-auto">
        <BarChart data={transformedData} layout="vertical">
          <XAxis type="number" tickFormatter={(value) => `${value / 1000}k`} />
          <YAxis type="category" dataKey="name" hide />
          {bars.map((bar) => {
            const region = data.find((region) => region.name === bar.dataKey);
            const value = region?.value || 0;
            const threshold = 5000;

            return (
              <Bar
                key={bar.dataKey}
                {...bar}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoveredRegion(region?.name || null)}
                onMouseLeave={() => setHoveredRegion(null)}>
                {value >= threshold && (
                  <LabelList
                    dataKey={bar.dataKey}
                    position="inside"
                    formatter={() => region?.name}
                    fill="hsl(var(--foreground))"
                  />
                )}
                {hoveredRegion === region?.name && value < threshold && (
                  <LabelList
                    dataKey={bar.dataKey}
                    position="top"
                    formatter={() => `${region?.name}`}
                    fill="hsl(var(--foreground))"
                  />
                )}
              </Bar>
            );
          })}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
