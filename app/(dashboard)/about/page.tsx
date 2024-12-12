import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-semibold text-center mb-2">About EnergyBlitz</h1>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Forecasting the Future of Energy Consumption
      </p>
      
      <div className="flex justify-center gap-2 mb-8">
        <Badge variant="secondary">Machine Learning</Badge>
        <Badge variant="secondary">Energy Analytics</Badge>
        <Badge variant="secondary">Next.js</Badge>
      </div>

      <Separator className="my-8" />

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-medium mb-3">Overview</h2>
          <p className="text-sm text-muted-foreground">
            EnergyBlitz is a cutting-edge energy consumption forecasting system developed for the PJM Interconnection. 
            By combining historical energy consumption data with comprehensive weather information, we provide accurate 
            predictions for both short-term (24-hour) and medium-term (7-day) energy demand.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Our Approach</h2>
          <p className="text-sm text-muted-foreground">
            We utilize advanced machine learning models including XGBoost, Random Forest, LSTM, and SARIMA to analyze 
            patterns in energy consumption. Our system integrates weather data from five major cities across the PJM 
            territory, enabling highly accurate predictions with a margin of error as low as 0.99%.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Data Sources</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Our analysis is powered by data from:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>PJM Hourly Energy Consumption Dataset (2002-2018)</li>
              <li>NOAA Weather Data from five strategic locations</li>
              <li>U.S. Federal Holiday Information</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Technical Preview</h2>
          <p className="text-sm text-muted-foreground">
            This project was developed as part of ITAI 2277 at Houston Community College. While it demonstrates 
            production-grade capabilities, it is currently available as a technical preview to showcase the 
            potential of machine learning in energy forecasting.
          </p>
        </section>

        <section className="pt-4">
          <h2 className="text-xl font-medium mb-3">Development Team</h2>
          <div className="flex gap-8 justify-center text-sm text-muted-foreground">
            <div className="text-center">
              <p className="font-medium">Varit Kobutra</p>
              <p>Lead Developer & ML Engineer</p>
            </div>
            <div className="text-center">
              <p className="font-medium">Sittichai Chaikamol</p>
              <p>Frontend Developer & Data Analyst</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}