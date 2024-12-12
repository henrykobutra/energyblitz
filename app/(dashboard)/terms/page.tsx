import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-semibold text-center mb-2">Terms of Use</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        EnergyBlitz Technical Preview
      </p>

      <Separator className="my-8" />

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-medium mb-2">1. Acceptance of Terms</h2>
          <p className="text-sm text-muted-foreground">
            By accessing or using EnergyBlitz, you agree to be bound by these
            Terms of Use and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">2. Technical Preview</h2>
          <p className="text-sm text-muted-foreground">
            EnergyBlitz is currently in a technical preview phase. Features,
            functionality, and availability may change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">3. Use of Service</h2>
          <p className="text-sm text-muted-foreground">
            You agree to use EnergyBlitz for its intended purpose and in
            compliance with all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">4. Intellectual Property</h2>
          <p className="text-sm text-muted-foreground">
            All content and functionality on EnergyBlitz are the exclusive
            property of EnergyBlitz and are protected by copyright and other
            intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">
            5. Disclaimer of Warranties
          </h2>
          <p className="text-sm text-muted-foreground">
            EnergyBlitz is provided &quot;as is&quot; without any warranties,
            expressed or implied. We do not guarantee the accuracy,
            completeness, or usefulness of any information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">
            6. Limitation of Liability
          </h2>
          <p className="text-sm text-muted-foreground">
            EnergyBlitz and its affiliates shall not be liable for any indirect,
            incidental, special, consequential or punitive damages resulting
            from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">7. Changes to Terms</h2>
          <p className="text-sm text-muted-foreground">
            We reserve the right to modify these Terms of Use at any time.
            Please review these terms periodically for changes.
          </p>
        </section>
      </div>
    </div>
  );
}
