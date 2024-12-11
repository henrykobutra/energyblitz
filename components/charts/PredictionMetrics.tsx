import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function PredictionMetrics() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trend Analysis</CardTitle>
        <CardDescription className="text-muted-foreground">
          Insights into energy consumption patterns over time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">hi mom</CardContent>
    </Card>
  );
}
