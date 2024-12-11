"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  DATA_START_DATE,
  DATA_END_DATE,
  DATA_PROVIDER,
  DATA_PREDICTION_SET,
  DATA_PREDICTION_MODEL,
} from "@/lib/data/constants";

export function DataConfiguration() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(DATA_START_DATE ? new Date(DATA_START_DATE) : null);
    setEndDate(DATA_END_DATE ? new Date(DATA_END_DATE) : null);
  }, []);

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM d, yyyy")} - ${format(
        endDate,
        "MMM d, yyyy",
      )}`;
    }
    return "Date range not available";
  };

  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <Label
          htmlFor="date-range"
          className="text-sm font-medium text-right whitespace-nowrap">
          Data Prediod:
        </Label>
        <Select
          disabled
          value={formatDateRange()}
          defaultValue={formatDateRange()}>
          <SelectTrigger id="date-range" className="w-full max-w-xs">
            <SelectValue>{formatDateRange()}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={formatDateRange()}>
              {formatDateRange()}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label
          htmlFor="data-provider"
          className="text-sm font-medium text-right whitespace-nowrap">
          Data Provider:
        </Label>
        <Select disabled defaultValue={DATA_PROVIDER || "unavailable"}>
          <SelectTrigger id="data-provider" className="w-full max-w-[200px]">
            <SelectValue placeholder="Data Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DATA_PROVIDER || "unavailable"}>
              {DATA_PROVIDER || "Not available"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label
          htmlFor="dataset"
          className="text-sm font-medium text-right whitespace-nowrap">
          Dataset:
        </Label>
        <Select disabled defaultValue={DATA_PREDICTION_SET || "unavailable"}>
          <SelectTrigger id="dataset" className="w-full max-w-[160px]">
            <SelectValue placeholder="Dataset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DATA_PREDICTION_SET || "unavailable"}>
              {DATA_PREDICTION_SET || "Not available"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label
          htmlFor="model"
          className="text-sm font-medium text-right whitespace-nowrap">
          Prediction Model:
        </Label>
        <Select disabled defaultValue={DATA_PREDICTION_MODEL || "unavailable"}>
          <SelectTrigger id="model" className="w-full max-w-[160px]">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DATA_PREDICTION_MODEL || "unavailable"}>
              {DATA_PREDICTION_MODEL || "Not available"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center ml-2">
              <span className="sr-only">Information</span>
              <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[400px] p-4">
            <p>
              This is a technical preview with fixed sample data. The
              configuration options are currently disabled as we&apos;re using a
              static dataset from{" "}
              <Link
                href="https://www.kaggle.com/datasets/robikscube/hourly-energy-consumption"
                className="underline"
                target="_blank"
                rel="noopener noreferrer">
                Kaggle
              </Link>
              . In future versions, you&apos;ll be able to select different data
              sources and date ranges.{" "}
              <Link
                href="https://github.com/henrykobutra/energyblitz"
                className="underline"
                target="_blank"
                rel="noopener noreferrer">
                Learn more
              </Link>{" "}
              about this project or visit our{" "}
              <Link href="/about" className="underline">
                about page
              </Link>
              .
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
