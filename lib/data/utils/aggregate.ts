import { ConsumptionData, ConsumptionDataParsed } from "@/types/data";
import { parseConsumptionData } from "@/lib/data/utils/parse";

export function aggregateData(
  data: ConsumptionData[],
  getGroupKey: (date: Date) => string,
): ConsumptionDataParsed[] {
  const groupedData = data.reduce(
    (acc: { [key: string]: ConsumptionData[] }, item) => {
      const date = new Date(item.timestamp);
      const key = getGroupKey(date);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {},
  );

  return Object.entries(groupedData)
    .map(([date, items]) => {
      const avgData: ConsumptionData = {
        timestamp: `${date}T00:00:00`,
        PJME: items.reduce((sum, item) => sum + item.PJME, 0) / items.length,
        Predicted_PJME:
          items.reduce((sum, item) => sum + item.Predicted_PJME, 0) /
          items.length,
        avg_temperature:
          items.reduce((sum, item) => sum + item.avg_temperature, 0) /
          items.length,
        is_holiday: items.some((item) => item.is_holiday),
        contributors_ids: [
          ...new Set(items.flatMap((item) => item.contributors_ids)),
        ],
      };
      return parseConsumptionData(avgData);
    })
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}
