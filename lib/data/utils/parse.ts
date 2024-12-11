import { ConsumptionData, ConsumptionDataParsed } from "@/types/data";

export function parseConsumptionData(
  data: ConsumptionData,
): ConsumptionDataParsed {
  return {
    ...data,
    timestamp: new Date(data.timestamp),
  };
}

export function getEffectiveStartDate(
  startDate: Date,
  endDate: Date,
  daysLimit: number,
): Date {
  const maxStartDate = new Date(
    endDate.getTime() - daysLimit * 24 * 60 * 60 * 1000,
  );
  return startDate > maxStartDate ? startDate : maxStartDate;
}
