import { ConsumptionDataParsed } from "@/types/data";
import { fetchFilteredData } from "@/lib/data/utils/fetch";
import {
  getEffectiveStartDate,
  parseConsumptionData,
} from "@/lib/data/utils/parse";
import { aggregateData } from "@/lib/data/utils/aggregate";

export * from "./fetch";
export * from "./parse";
export * from "./aggregate";

export async function fetchHourlyData(
  startDate: Date,
  endDate: Date = new Date(),
): Promise<ConsumptionDataParsed[]> {
  try {
    const effectiveStartDate = getEffectiveStartDate(startDate, endDate, 7); // 7 days
    const data = await fetchFilteredData(effectiveStartDate, endDate);
    return data
      .map(parseConsumptionData)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  } catch (error) {
    console.error("Error fetching hourly data:", error);
    throw error;
  }
}

export async function fetchDailyData(
  startDate: Date,
  endDate: Date = new Date(),
): Promise<ConsumptionDataParsed[]> {
  try {
    const effectiveStartDate = getEffectiveStartDate(startDate, endDate, 30);
    const data = await fetchFilteredData(effectiveStartDate, endDate);
    return aggregateData(data, (date) => date.toISOString().split("T")[0]);
  } catch (error) {
    console.error("Error fetching daily data:", error);
    throw error;
  }
}

export async function fetchWeeklyData(
  startDate: Date,
  endDate: Date = new Date(),
): Promise<ConsumptionDataParsed[]> {
  try {
    const effectiveStartDate = getEffectiveStartDate(startDate, endDate, 90); // 3 months
    const data = await fetchFilteredData(effectiveStartDate, endDate);
    return aggregateData(data, (date) => {
      // Get the Monday of the week (assuming Monday is start of week)
      const day = date.getUTCDay();
      const diff = date.getUTCDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date);
      monday.setUTCDate(diff);
      return monday.toISOString().split("T")[0];
    });
  } catch (error) {
    console.error("Error fetching weekly data:", error);
    throw error;
  }
}

export async function fetchMonthlyData(
  startDate: Date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
  endDate: Date = new Date(),
): Promise<ConsumptionDataParsed[]> {
  try {
    const effectiveStartDate = getEffectiveStartDate(startDate, endDate, 365); // 1 year
    const data = await fetchFilteredData(effectiveStartDate, endDate);
    return aggregateData(
      data,
      (date) =>
        `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
          2,
          "0",
        )}-01`,
    );
  } catch (error) {
    console.error("Error fetching monthly data:", error);
    throw error;
  }
}
