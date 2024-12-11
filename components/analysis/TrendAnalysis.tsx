import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import {
  TrendingUp,
  Calendar,
  AlertTriangle,
  Bot,
  DollarSign,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrendAnalysis() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Trend Analysis"
        description="Insights into energy consumption patterns over time"
      />
      <CardContent className="flex-grow space-y-6">
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              5% increase in overall energy usage this quarter
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Highest consumption between 6-8 PM weekdays
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Unusual 15% usage spike on recent weekends
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Potential 12% cost savings identified in off-peak usage
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Zap className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Peak demand exceeded threshold 3 times this month
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
