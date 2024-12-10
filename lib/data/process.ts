import { parse } from "date-fns";

interface RawPJMData {
  Datetime: string;
  [key: string]: string | number; // For the MW columns (AEP_MW, COMED_MW, etc.)
}

interface ProcessedConsumptionData {
  month: string;
  desktop: number;
  mobile: number;
}

/**
 * Processes raw PJM data into monthly aggregated consumption data
 * @param data Array of raw PJM data entries
 * @param desktopRegion Primary region to show as "desktop" series
 * @param mobileRegion Secondary region to show as "mobile" series
 * @returns Processed data ready for ConsumptionChart
 */
export function processPJMData(
  data: RawPJMData[],
  desktopRegion: string = "AEP_MW",
  mobileRegion: string = "COMED_MW",
): ProcessedConsumptionData[] {
  // Group data by month and calculate averages
  const monthlyData = new Map<
    string,
    { desktop: number[]; mobile: number[] }
  >();

  data.forEach((entry) => {
    const date = parse(entry.Datetime, "yyyy-MM-dd HH:mm:ss", new Date());
    const month = date.toLocaleString("default", { month: "long" });

    if (!monthlyData.has(month)) {
      monthlyData.set(month, { desktop: [], mobile: [] });
    }

    const monthData = monthlyData.get(month)!;
    monthData.desktop.push(Number(entry[desktopRegion]) || 0);
    monthData.mobile.push(Number(entry[mobileRegion]) || 0);
  });

  // Calculate monthly averages
  return Array.from(monthlyData.entries()).map(([month, values]) => ({
    month,
    desktop: Math.round(
      values.desktop.reduce((sum, val) => sum + val, 0) / values.desktop.length,
    ),
    mobile: Math.round(
      values.mobile.reduce((sum, val) => sum + val, 0) / values.mobile.length,
    ),
  }));
}

/**
 * Helper function to load and process data from a specific CSV file
 */
export async function loadPJMDataFromCSV(
  filename: string,
  desktopRegion?: string,
  mobileRegion?: string,
): Promise<ProcessedConsumptionData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/pjm_dataset/${filename}`,
  );
  const text = await response.text();

  // Basic CSV parsing (you might want to use a CSV parser library in production)
  const lines = text.split("\n");
  const headers = lines[0].split(",");

  const data: RawPJMData[] = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as RawPJMData);
  });

  return processPJMData(data, desktopRegion, mobileRegion);
}
