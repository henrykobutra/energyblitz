"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import { Zap, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChartStore } from "@/lib/stores/chartStore";
import { useEffect, useState } from "react";
import { fetchFilteredData, fetchContributors } from "@/lib/data/utils";
import { formatImpactText, getFeatureIcon } from "@/lib/analysis/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AggregatedContribution {
  feature: string;
  totalContribution: number;
  frequency: number;
  averageContribution: number;
}

export function ImpactAssessment() {
  const { dateRange } = useChartStore();
  const [aggregatedContributions, setAggregatedContributions] = useState<
    AggregatedContribution[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadContributions() {
      if (!dateRange?.from || !dateRange?.to) return;

      setIsLoading(true);
      try {
        // 1. Fetch consumption data for the date range
        const consumptionData = await fetchFilteredData(
          dateRange.from,
          dateRange.to,
        );

        // 2. Collect unique contributor IDs
        const uniqueContributorIds = Array.from(
          new Set(consumptionData.flatMap((d) => d.contributors_ids)),
        );

        // 3. Fetch all relevant contributors
        const contributors = await fetchContributors(uniqueContributorIds);

        // 4. Aggregate contributions by feature
        const contributionMap = new Map<string, AggregatedContribution>();

        contributors.forEach((contributor) => {
          const existing = contributionMap.get(contributor.feature);
          if (existing) {
            existing.totalContribution += contributor.contribution;
            existing.frequency += 1;
            existing.averageContribution =
              existing.totalContribution / existing.frequency;
          } else {
            contributionMap.set(contributor.feature, {
              feature: contributor.feature,
              totalContribution: contributor.contribution,
              frequency: 1,
              averageContribution: contributor.contribution,
            });
          }
        });

        // 5. Sort by average contribution and take top 7
        const sorted = Array.from(contributionMap.values())
          .sort(
            (a, b) =>
              Math.abs(b.averageContribution) - Math.abs(a.averageContribution),
          )
          .slice(0, 7);

        setAggregatedContributions(sorted);
      } catch (error) {
        console.error("Error loading contributions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContributions();
  }, [dateRange]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Impact Assessment"
        description="Quantitative analysis of external factors influencing energy demand"
      />
      <CardContent className="flex-grow space-y-6">
        <ul className="space-y-4">
          {isLoading
            ? // Loading skeleton state
              Array.from({ length: 5 }).map((_, index) => (
                <li className="flex items-start space-x-3" key={index}>
                  <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                  <Skeleton className="h-4 w-[250px]" />
                </li>
              ))
            : // Existing content
              aggregatedContributions.map((contribution) => {
                const { icon: Icon, color } = getFeatureIcon(
                  contribution.feature,
                );
                return (
                  <li
                    className="flex items-start space-x-3"
                    key={contribution.feature}>
                    <Icon className={`h-5 w-5 ${color} mt-0.5 flex-shrink-0`} />
                    <span className="text-sm">
                      {formatImpactText(
                        contribution.feature,
                        contribution.averageContribution,
                      )}
                    </span>
                  </li>
                );
              })}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-1/2" disabled={isLoading}>
          <Zap className="mr-2 h-4 w-4" />
          Tune Predictive Models
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-1/2"
          disabled={isLoading}>
          <Bot className="mr-2 h-4 w-4" />
          Explore with Blitz Bot
        </Button>
      </CardFooter>
    </Card>
  );
}
