import { ConsumptionDataParsed } from "@/types/data";
import { format } from "date-fns";

export * from "./impact";

export interface AnalysisInsights {
  percentageChange: number;
  peakTimes: string[];
  predictionAccuracy: number;
  costSavings: number;
  anomalyCount: number;
  highestUsageDay: string;
  averageUsage: number;
}

export function calculateChange(data: ConsumptionDataParsed[]): number {
  if (data.length < 48) return 0;

  const currentPeriod = data.slice(-24).reduce((sum, d) => sum + d.PJME, 0);
  const previousPeriod = data
    .slice(-48, -24)
    .reduce((sum, d) => sum + d.PJME, 0);
  return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
}

export function findPeakUsageTimes(data: ConsumptionDataParsed[]): string[] {
  return data
    .sort((a, b) => b.PJME - a.PJME)
    .slice(0, 3)
    .map((d) => format(d.timestamp, "h:mm aa"));
}

export function calculatePredictionAccuracy(
  data: ConsumptionDataParsed[],
): number {
  if (data.length === 0) return 0;

  const accuracy =
    (data.reduce((acc, d) => {
      const error = Math.abs(d.PJME - d.Predicted_PJME) / d.PJME;
      return acc + (1 - error);
    }, 0) /
      data.length) *
    100;

  return accuracy;
}

function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squareDiffs = values.map((value) => Math.pow(value - mean, 2));
  const avgSquareDiff =
    squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(avgSquareDiff);
}

export function detectAnomalies(data: ConsumptionDataParsed[]): number {
  const values = data.map((d) => d.PJME);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const stdDev = calculateStandardDeviation(values);

  return data.filter((d) => Math.abs(d.PJME - mean) > 2 * stdDev).length;
}

export function analyzeCostSavings(data: ConsumptionDataParsed[]): number {
  const peakHourRate = 0.15; // Example rate $/kWh
  const offPeakRate = 0.08;

  return data.reduce((savings, d) => {
    const hour = d.timestamp.getHours();
    const isPeakHour = hour >= 9 && hour <= 17;
    const potentialShift = isPeakHour ? d.PJME * 0.1 : 0; // Assume 10% can be shifted
    return savings + potentialShift * (peakHourRate - offPeakRate);
  }, 0);
}

export function calculateAverageUsage(data: ConsumptionDataParsed[]): number {
  if (data.length === 0) return 0;
  return data.reduce((sum, d) => sum + d.PJME, 0) / data.length;
}

export function findHighestUsageDay(data: ConsumptionDataParsed[]): string {
  if (data.length === 0) return "";

  const highest = data.reduce(
    (max, d) => (d.PJME > max.PJME ? d : max),
    data[0],
  );

  return format(highest.timestamp, "EEE, MMMM d");
}

export function generateInsights(
  data: ConsumptionDataParsed[],
): AnalysisInsights {
  return {
    percentageChange: calculateChange(data),
    peakTimes: findPeakUsageTimes(data),
    predictionAccuracy: calculatePredictionAccuracy(data),
    costSavings: analyzeCostSavings(data),
    anomalyCount: detectAnomalies(data),
    highestUsageDay: findHighestUsageDay(data),
    averageUsage: calculateAverageUsage(data),
  };
}
