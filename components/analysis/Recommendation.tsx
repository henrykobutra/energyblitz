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

export function Recommendations() {
  return (
    <Card className="h-full flex flex-col">
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
                  Reduce peak load by 12% through smart load distribution in
                  MIDATL region
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-8">
              <Button variant="default" size="sm">
                Apply Load Balancing <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm">
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
              <Button variant="default" size="sm">
                Review Plan <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm">
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
              <Button variant="default" size="sm">
                Configure DR <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm">
                Simulation Results
              </Button>
            </div>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          variant="ghost"
          className="w-full text-sm text-muted-foreground hover:text-foreground">
          View More Recommendations
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
