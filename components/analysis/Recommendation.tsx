'use client'

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Zap,
  TrendingDown,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useFeaturePreviewDialog } from "@/contexts/FeaturePreviewContext";

export function Recommendations() {
  const { openDialog } = useFeaturePreviewDialog();
  return (
    <Card className="h-full flex flex-col relative">
      <div className="absolute -right-1 top-4 z-10">
        <div className="bg-yellow-500 text-yellow-950 text-xs font-semibold px-3 py-1 rounded-l-md relative after:absolute after:top-0 after:right-0 after:border-t-[12px] after:border-r-[12px] after:border-t-yellow-600 after:border-r-transparent">
          Feature Preview
        </div>
      </div>
      
      <CardHeader
        title="Recommendations"
        description="AI-powered suggestions to improve grid efficiency"
      />
      <CardContent className="flex-grow space-y-6">
        <ul className="space-y-4">
          <li className="flex flex-col space-y-2">
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 flex-grow">
                <p className="text-sm font-medium">Peak Load Management</p>
                <p className="text-sm text-muted-foreground">
                  Reduce peak load by 12% through smart load distribution
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-8">
              <Button variant="default" size="sm" onClick={openDialog}>
                Apply Load Balancing <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" onClick={openDialog}>
                View Impact Analysis
              </Button>
            </div>
          </li>

          <li className="flex flex-col space-y-2">
            <div className="flex items-start space-x-3">
              <TrendingDown className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 flex-grow">
                <p className="text-sm font-medium">Resource Optimization</p>
                <p className="text-sm text-muted-foreground">
                  Optimize resource allocation to save $2.3M in operational
                  costs
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-8">
              <Button variant="default" size="sm" onClick={openDialog}>
                Review Plan <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" onClick={openDialog}>
                Calculate ROI
              </Button>
            </div>
          </li>

          <li className="flex flex-col space-y-2">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 flex-grow">
                <p className="text-sm font-medium">Demand Response</p>
                <p className="text-sm text-muted-foreground">
                  Implement automated demand response for 15% efficiency gain
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-8">
              <Button variant="default" size="sm" onClick={openDialog}>
                Configure DR <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" onClick={openDialog}>
                Simulation Results
              </Button>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          variant="ghost"
          className="w-full text-sm text-muted-foreground hover:text-foreground"
          onClick={openDialog}>
          View More Recommendations
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
