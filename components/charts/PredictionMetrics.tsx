import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/CardHeader";

export function PredictionMetrics() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="Prediction Metrics"
        description="Metrics for the prediction model"
      />
      <CardContent className="flex-grow space-y-6">hi mom</CardContent>
    </Card>
  );
}
