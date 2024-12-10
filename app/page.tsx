import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">EnergyBlitz</div>
        <nav className="space-x-4">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link
            href="#about"
            className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6">
            Energy Consumption
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Analyze, forecast, and optimize energy consumption patterns using
            advanced machine learning.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-10 w-10" />,
                  title: "ML-Powered Forecasting",
                  description:
                    "Leverage advanced machine learning models to predict future energy consumption trends.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10" />,
                  title: "Trend Analysis",
                  description:
                    "Identify seasonal patterns, anomalies, and correlations in energy usage data.",
                },
                {
                  icon: <Lightbulb className="h-10 w-10" />,
                  title: "AI Insights",
                  description:
                    "Get actionable insights and recommendations based on consumption patterns and external factors.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-lg">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              About EnergyBlitz
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-6">
                EnergyBlitz is a college project aimed at revolutionizing energy
                consumption analysis through advanced machine learning
                techniques. Our platform provides powerful tools for
                forecasting, trend analysis, and AI-driven insights to help
                understand and optimize energy usage patterns.
              </p>
              <p className="text-lg text-muted-foreground">
                While this is currently a non-commercial project, we&apos;re
                excited about the potential impact of our technology on energy
                management and sustainability efforts.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to explore energy consumption insights?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Check out our dashboard to see EnergyBlitz in action and discover
              the power of AI-driven energy analysis.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} EnergyBlitz. A college project for
            advanced energy consumption analysis.
          </p>
        </div>
      </footer>
    </div>
  );
}
