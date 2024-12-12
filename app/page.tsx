import {
  Zap,
  BrainCircuit,
  BarChartIcon as ChartIcon,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DemoChart } from "@/components/DemoChart";
import Link from "next/link";

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  available: boolean;
}

function Feature({ icon: Icon, title, description, available }: FeatureProps) {
  return (
    <Card className={available ? "" : "opacity-60"}>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-full bg-yellow-100">
            <Icon className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          {!available && (
            <span className="text-xs text-gray-400">Could be coming soon</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-50/50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-semibold">EnergyBlitz</h1>
          </div>
          <p className="text-gray-600">
            AI-powered energy consumption forecasting and analysis platform
          </p>
          <div>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-white">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Chart */}
      <div className="container mx-auto px-4 py-8">
        <div className="h-64 w-full">
          <DemoChart />
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <Feature
            icon={ChartIcon}
            title="Consumption Analysis"
            description="Visualize and analyze energy consumption patterns"
            available={true}
          />
          <Feature
            icon={BrainCircuit}
            title="ML Forecasting"
            description="24-hour and 7-day consumption predictions"
            available={true}
          />
          <Feature
            icon={Gauge}
            title="Weather Impact Analysis"
            description="Understand weather effects on consumption"
            available={true}
          />
          <Feature
            icon={Zap}
            title="Real-time Monitoring"
            description="Monitor energy usage across regions"
            available={false}
          />
        </div>

        <Alert className="mt-8">
          <AlertDescription>
            This project is currently in development as part of ITAI 2277 at
            HCC. Some features are under active development.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
