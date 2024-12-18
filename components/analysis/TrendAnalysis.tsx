"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  Bot,
  DollarSign,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchHourlyData } from "@/lib/data/utils";
import { generateInsights, AnalysisInsights } from "@/lib/analysis/utils";
import { useChartStore } from "@/lib/stores/chartStore";
import { cn } from "@/lib/utils";
import { useFeaturePreviewDialog } from "@/contexts/FeaturePreviewContext";

export function TrendAnalysis() {
  const { openDialog } = useFeaturePreviewDialog();
  const { dateRange } = useChartStore();
  const [insights, setInsights] = useState<AnalysisInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transitionClasses = "transition-opacity duration-200";

  useEffect(() => {
    async function analyzeData() {
      if (!dateRange?.from || !dateRange?.to) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchHourlyData(dateRange.from, dateRange.to);
        const calculatedInsights = generateInsights(data);
        setInsights(calculatedInsights);
      } catch (err) {
        setError("Failed to analyze energy data");
        console.error("Analysis error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    analyzeData();
  }, [dateRange]);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader
          title="Trend Analysis"
          description="Insights into energy consumption patterns over time"
        />
        <CardContent
          className={cn("flex-grow space-y-6 opacity-100", transitionClasses)}>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              {insights?.percentageChange && insights.percentageChange > 0 ? (
                <TrendingUp className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm">
                X.X% decrease in energy usage compared to previous period
              </span>
            </li>

            <li className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Peak usage times:{" "}
                <strong>{insights?.peakTimes.join(", ")}</strong>
              </span>
            </li>

            <li className="flex items-start space-x-3">
              <AlertTriangle
                className={`h-5 w-5 ${
                  insights?.anomalyCount ? "text-yellow-500" : "text-green-500"
                } mt-0.5 flex-shrink-0`}
              />
              <span className="text-sm">
                {insights?.anomalyCount ?? 0} unusual usage patterns detected
              </span>
            </li>

            <li className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Potential $X,XXX.XX savings identified in off-peak usage
              </span>
            </li>

            <li className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Highest usage recorded on{" "}
                <strong>{insights?.highestUsageDay}</strong>
              </span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Bot className="mr-2 h-4 w-4" />
            Analyze with Blitz Bot
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader
          title="Trend Analysis"
          description="Unable to generate insights"
        />
        <CardContent className="flex-grow flex items-center justify-center text-destructive">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Trend Analysis"
        description="Insights into energy consumption patterns over time"
      />
      <CardContent
        className={cn("flex-grow space-y-6 opacity-100", transitionClasses)}>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            {insights?.percentageChange && insights.percentageChange > 0 ? (
              <TrendingUp className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            ) : (
              <TrendingDown className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            )}
            <span className="text-sm">
              {insights?.percentageChange
                ? `${Math.abs(insights.percentageChange).toFixed(1)}% ${
                    insights.percentageChange > 0 ? "increase" : "decrease"
                  } in energy usage compared to previous period`
                : "No change in energy usage"}
            </span>
          </li>

          <li className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Peak usage times:{" "}
              <strong>{insights?.peakTimes.join(", ")}</strong>
            </span>
          </li>

          <li className="flex items-start space-x-3">
            <AlertTriangle
              className={`h-5 w-5 ${
                insights?.anomalyCount ? "text-yellow-500" : "text-green-500"
              } mt-0.5 flex-shrink-0`}
            />
            <span className="text-sm">
              {insights?.anomalyCount ?? 0} unusual usage patterns detected
            </span>
          </li>

          <li className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Potential{" "}
              <strong>
                $
                {insights?.costSavings.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>{" "}
              savings identified in off-peak usage
            </span>
          </li>

          <li className="flex items-start space-x-3">
            <Zap className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Highest usage recorded on{" "}
              <strong>{insights?.highestUsageDay}</strong>
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={openDialog}>
          <Bot className="mr-2 h-4 w-4" />
          Analyze with Blitz Bot
        </Button>
      </CardFooter>
    </Card>
  );
}
