import { create } from 'zustand'
import { DateRange } from "react-day-picker"
import { TimeRange } from "@/types/enums"
import { parseISO, addDays } from "date-fns"
import { DATA_START_DATE } from "@/lib/data/constants"

interface ChartState {
  activeTab: TimeRange
  dateRange: DateRange | undefined
  setActiveTab: (tab: TimeRange) => void
  setDateRange: (dateRange: DateRange | undefined) => void
}

export const useChartStore = create<ChartState>((set) => ({
  activeTab: TimeRange.DAYS_7,
  dateRange: {
    from: parseISO(DATA_START_DATE),
    to: addDays(parseISO(DATA_START_DATE), 6),
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setDateRange: (dateRange) => set({ dateRange }),
}))