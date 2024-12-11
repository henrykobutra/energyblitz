import { DataConfiguration } from "@/components/DataConfiguration";
import { EnergyConsumptionChart } from "@/components/charts/EnergyConsumptionChart";
import { TrendAnalysis } from "@/components/analysis/TrendAnalysis";
import { ImpactAssessment } from "@/components/analysis/ImpactAssessment";
import { Recommendations } from "@/components/analysis/Recommendation";
import { PredictionMetrics } from "@/components/charts/PredictionMetrics";
const DashboardPage = () => {
  // #Layout Design
  // ✅ select year
  // ✅ energy consumption and prediction -> ✅ Trend Analysis
  // ✅ Impact Assessment -> ✅ Recommendations
  // Github style hourly consumption trends
  // Detailed Region Overview (Line chart) with View More to drill down on Region
  return (
    <div className="flex flex-col gap-4">
      <DataConfiguration />
      <div className="flex gap-4">
        <div className="w-2/3 flex flex-col gap-4">
          <EnergyConsumptionChart />
        </div>
        <div className="w-1/3 flex flex-col gap-4">
          <TrendAnalysis />
          <PredictionMetrics />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <ImpactAssessment />
        </div>
        <div className="w-1/2">
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
