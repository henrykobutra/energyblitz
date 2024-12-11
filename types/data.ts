/** Represents raw consumption data point with associated predictions and metadata */
export interface ConsumptionData {
  /** ISO timestamp string (e.g., "2017-12-07T20:00:00") */
  timestamp: string;
  /** Actual energy consumption value in megawatts */
  PJME: number;
  /** Predicted energy consumption value in megawatts */
  Predicted_PJME: number;
  /** Average temperature for the time period in degrees */
  avg_temperature: number;
  /** Indicates whether this timestamp falls on a holiday */
  is_holiday: boolean;
  /** Array of contributor IDs that influenced this prediction */
  contributors_ids: number[];
}

/** Parsed version of ConsumptionData with timestamp converted to Date object */
export interface ConsumptionDataParsed
  extends Omit<ConsumptionData, "timestamp"> {
  /** JavaScript Date object parsed from the timestamp string */
  timestamp: Date;
}

/** Represents a feature's contribution to the prediction model */
export interface Contributor {
  /** Unique identifier for the contributor */
  id: number;
  /** Name or description of the contributing feature */
  feature: string;
  /** Numerical value representing this feature's contribution to the prediction */
  contribution: number;
}
