// Format the impact text based on the feature type and its average contribution
export const formatImpactText = (feature: string, avgContribution: number) => {
  const absContribution = Math.abs(avgContribution);
  const value = absContribution.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });

  switch (feature) {
    case "consumption_change_rate_24h":
      return `Historical consumption patterns influence predictions by ${value} MW`;
    case "hour":
      return `Time of day affects consumption by ${value} MW`;
    case "PJME_lag_24h":
      return `Previous day's PJM East consumption affects predictions by ${value} MW`;
    case "PJMW_lag_24h":
      return `Previous day's PJM West consumption affects predictions by ${value} MW`;
    case "avg_temperature_washington":
      return `Average temperature in Washington impacts demand by ${value} MW`;
    case "temperature_washington":
      return `Washington temperature influences consumption by ${value} MW`;
    case "avg_temperature":
      return `Average temperature variations impact demand by ${value} MW`;
    case "temperature":
      return `Temperature conditions affect consumption by ${value} MW`;
    case "min_temperature":
      return `Minimum temperature influences demand by ${value} MW`;
    case "is_peak_hour":
      return `Peak hours shift consumption by ${value} MW`;
    case "is_peak_hour_of_week":
      return `Weekly peak hours affect consumption by ${value} MW`;
    case "day_of_week":
      return `Day of week patterns contribute ${value} MW to predictions`;
    case "temp_hour_sin":
      return `Temperature-time of day interaction (sine) affects demand by ${value} MW`;
    case "temp_hour_cos":
      return `Temperature-time of day interaction (cosine) affects demand by ${value} MW`;
    case "hour_cos":
      return `Cyclical time of day patterns influence consumption by ${value} MW`;
    default:
      return `${feature.replace(
        /_/g,
        " ",
      )} influences predictions by ${value} MW`;
  }
};

import type { LucideIcon } from "lucide-react";
import {
  Thermometer,
  Clock,
  Calendar,
  Sun,
  CloudSun,
  Gauge,
  LineChart,
  Snowflake,
} from "lucide-react";

interface IconConfig {
  icon: LucideIcon;
  color: string;
}

export const getFeatureIcon = (feature: string): IconConfig => {
  switch (feature) {
    case "consumption_change_rate_24h":
      return { icon: LineChart, color: "text-blue-500" };
    case "hour":
    case "hour_cos":
    case "is_peak_hour":
      return { icon: Clock, color: "text-purple-500" };
    case "PJME_lag_24h":
    case "PJMW_lag_24h":
      return { icon: Gauge, color: "text-green-500" };
    case "avg_temperature_washington":
    case "temperature_washington":
    case "avg_temperature":
    case "temperature":
      return { icon: Thermometer, color: "text-red-500" };
    case "min_temperature":
      return { icon: Snowflake, color: "text-blue-500" };
    case "is_peak_hour_of_week":
    case "day_of_week":
      return { icon: Calendar, color: "text-amber-500" };
    case "temp_hour_sin":
    case "temp_hour_cos":
      return { icon: Sun, color: "text-orange-500" };
    default:
      return { icon: CloudSun, color: "text-gray-500" };
  }
};
