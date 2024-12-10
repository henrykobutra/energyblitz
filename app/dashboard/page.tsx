import { YearSelector } from "@/components/YearSelector";
import { RegionalChart } from "@/components/charts/RegionalChart";
import { EnergyConsumptionChart } from "@/components/charts/EnergyConsumptionChart";
import { TrendAnalysis } from "@/components/analysis/TrendAnalysis";
import { ImpactAssessment } from "@/components/analysis/ImpactAssessment";
import { Recommendations } from "@/components/analysis/Recommendation";
const DashboardPage = () => {
  // #Layout Design
  // ✅ select year
  // ✅ Slim regional overview (Stacked bar perhaps with hoverability)
  // ✅ energy consumption and prediction -> ✅ Trend Analysis
  // ✅ Impact Assessment -> ✅ Recommendations
  // Github style hourly consumption trends
  // Detailed Region Overview (Line chart) with View More to drill down on Region
  return (
    <div className="flex flex-col gap-4">
      <YearSelector />
      <RegionalChart />
      <div className="flex gap-4">
        <div className="w-2/3 h-[25rem]">
          <EnergyConsumptionChart />
        </div>
        <div className="w-1/3 h-[25rem]">
          <TrendAnalysis />
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
