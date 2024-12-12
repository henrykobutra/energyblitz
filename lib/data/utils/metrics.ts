import { ConsumptionDataParsed } from "@/types/data";

interface PredictionMetrics {
  mae: number;
  rmse: number;
  mape: number;
  r2: number;
}

export function calculatePredictionMetrics(
  data: ConsumptionDataParsed[],
): PredictionMetrics {
  const n = data.length;

  // Calculate differences between actual and predicted values
  const differences = data.map((d) => d.PJME - d.Predicted_PJME);
  const absoluteDifferences = differences.map((d) => Math.abs(d));
  const squaredDifferences = differences.map((d) => d * d);

  // Calculate MAE (Mean Absolute Error)
  const mae = absoluteDifferences.reduce((sum, d) => sum + d, 0) / n;

  // Calculate RMSE (Root Mean Square Error)
  const rmse = Math.sqrt(squaredDifferences.reduce((sum, d) => sum + d, 0) / n);

  // Calculate MAPE (Mean Absolute Percentage Error)
  const mape =
    (absoluteDifferences.reduce((sum, d, i) => sum + d / data[i].PJME, 0) / n) *
    100;

  // Calculate R² (R-squared)
  const mean = data.reduce((sum, d) => sum + d.PJME, 0) / n;
  const totalSS = data.reduce((sum, d) => sum + Math.pow(d.PJME - mean, 2), 0);
  const residualSS = squaredDifferences.reduce((sum, d) => sum + d, 0);
  const r2 = 1 - residualSS / totalSS;

  return {
    mae,
    rmse,
    mape,
    r2,
  };
}
