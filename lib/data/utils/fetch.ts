import { ConsumptionData, Contributor } from "@/types/data";
import {
  CONSUMPTION_DATA_FILE,
  CONTRIBUTORS_DATA_FILE,
} from "@/lib/data/constants";

export async function fetchFilteredData(
  startDate: Date,
  endDate: Date,
): Promise<ConsumptionData[]> {
  const response = await fetch(CONSUMPTION_DATA_FILE);
  if (!response.ok) {
    throw new Error("Failed to fetch consumption data");
  }

  const data: ConsumptionData[] = await response.json();
  return data.filter((item) => {
    const itemDate = new Date(item.timestamp);
    return itemDate >= startDate && itemDate <= endDate;
  });
}

export async function fetchContributors(
  contributorIds?: number[],
): Promise<Contributor[]> {
  try {
    const response = await fetch(CONTRIBUTORS_DATA_FILE);
    if (!response.ok) {
      throw new Error("Failed to fetch contributors data");
    }

    const contributors: Contributor[] = await response.json();

    if (!contributorIds?.length) {
      return contributors;
    }

    return contributors.filter((contributor) =>
      contributorIds.includes(contributor.id),
    );
  } catch (error) {
    console.error("Error fetching contributors:", error);
    throw error;
  }
}
