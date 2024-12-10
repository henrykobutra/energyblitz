"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YEARS } from "@/constants/dates";
import { Button } from "@/components/ui/button";

const latestYear = YEARS[YEARS.length - 1];

export function YearSelector() {
  const [selectedYear, setSelectedYear] = useState(latestYear);

  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium">Select Year:</span>
      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedYear !== latestYear && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedYear(latestYear)}>
          Go To Latest Year
        </Button>
      )}
    </div>
  );
}
