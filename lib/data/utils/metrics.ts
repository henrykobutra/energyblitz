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
  // Filter out invalid data points
  const validData = data.filter(
    (item) =>
      item.PJME != null &&
      item.Predicted_PJME != null &&
      !isNaN(item.PJME) &&
      !isNaN(item.Predicted_PJME) &&
      item.PJME !== 0, // Prevent division by zero for MAPE
  );

  if (!validData.length) {
    return {
      mae: 0,
      rmse: 0,
      mape: 0,
      r2: 0,
    };
  }

  const n = validData.length;
  let sumActual = 0;
  let sumAbsError = 0;
  let sumSquaredError = 0;
  let sumAbsPercentError = 0;
  let sumSquaredTotal = 0;

  // Calculate means and errors using only valid data
  validData.forEach((item) => {
    const actual = item.PJME;
    const predicted = item.Predicted_PJME;
    const error = actual - predicted;

    sumActual += actual;
    sumAbsError += Math.abs(error);
    sumSquaredError += error * error;
    sumAbsPercentError += Math.abs(error / actual) * 100;
  });

  const meanActual = sumActual / n;

  // Recalculate sums in a separate loop for accuracy
  validData.forEach((item) => {
    const actual = item.PJME;
    const predicted = item.Predicted_PJME;

    // Calculate residual sum of squares (RSS)
    sumSquaredError += Math.pow(actual - predicted, 2);
    // Calculate total sum of squares (TSS)
    sumSquaredTotal += Math.pow(actual - meanActual, 2);
  });

  // Calculate metrics
  const mae = sumAbsError / n;
  const rmse = Math.sqrt(sumSquaredError / n);
  const mape = sumAbsPercentError / n;
  // R² = 1 - (RSS/TSS)
  const r2 = Math.max(0, 1 - sumSquaredError / sumSquaredTotal);

  return {
    mae,
    rmse,
    mape,
    r2,
  };
}
