import { addDays, parseISO } from "date-fns";
import { DATA_END_DATE } from "@/lib/data/constants";

export const getTimeFormat = (tab: string) => {
  switch (tab) {
    case "hourly":
      return "HH:mm";
    case "daily":
      return "MMM dd HH:mm";
    case "weekly":
      return "MMM dd";
    case "monthly":
      return "'Week' w";
    default:
      return "MMM dd";
  }
};

export const getDateRange = (selectedDate: Date, activeTab: string) => {
  const from = selectedDate;
  let to;
  
  switch (activeTab) {
    case "hourly":
      to = addDays(from, 1); // 48 hours
      break;
    case "daily":
      to = addDays(from, 6); // 7 days
      break;
    case "weekly":
      to = addDays(from, 29); // 30 days
      break;
    case "monthly":
      to = parseISO(DATA_END_DATE); // Use the full end date
      break;
    default:
      to = addDays(from, 6);
  }
  
  return { from, to };
};

export const getMaxDate = (activeTab: string) => {
  switch (activeTab) {
    case "hourly":
      return addDays(new Date(DATA_END_DATE), -1);
    case "daily":
      return addDays(new Date(DATA_END_DATE), -6);
    case "weekly":
      return addDays(new Date(DATA_END_DATE), -29);
    default:
      return new Date(DATA_END_DATE);
  }
};

export const getDaysToAdd = (activeTab: string) => {
  switch (activeTab) {
    case "hourly":
      return 1;
    case "daily":
      return 6;
    case "weekly":
      return 29;
    default:
      return undefined;
  }
};