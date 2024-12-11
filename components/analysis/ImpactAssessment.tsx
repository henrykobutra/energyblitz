import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";
import {
  Thermometer,
  CloudRain,
  Factory,
  Zap,
  Bot,
  Wind,
  Sun,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImpactAssessment() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Impact Assessment"
        description="Quantitative analysis of external factors influencing energy demand"
      />
      <CardContent className="flex-grow space-y-6">
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <Thermometer className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              1°C temperature rise leads to 3.2% increase in cooling demand
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <CloudRain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Heavy rainfall correlates with 7% decrease in solar energy
              production
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Factory className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Industrial activity surge causes 12% spike in peak hour
              consumption
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Wind className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Strong wind conditions improve turbine efficiency by 15% during
              peak periods
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Sun className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Clear sky days increase solar generation capacity by 25% above
              baseline
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Building2 className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Commercial building occupancy affects energy usage by up to 18%
              daily
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm">
              Seasonal transitions cause 9% fluctuation in overall energy
              patterns
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-1/2">
          <Zap className="mr-2 h-4 w-4" />
          Tune Predictive Models
        </Button>
        <Button variant="outline" className="w-full sm:w-1/2">
          <Bot className="mr-2 h-4 w-4" />
          Explore with Blitz Bot
        </Button>
      </CardFooter>
    </Card>
  );
}
