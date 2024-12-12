import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-semibold text-center mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        EnergyBlitz Technical Preview
      </p>

      <Separator className="my-8" />

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-medium mb-2">1. No Data Collection</h2>
          <p className="text-sm text-muted-foreground">
            EnergyBlitz does not collect, store, or process any personal
            information from its users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">2. Hosting</h2>
          <p className="text-sm text-muted-foreground">
            Our website is hosted on Vercel. While we do not collect data,
            Vercel may collect certain anonymous usage data as part of their
            standard hosting services. For more information, please refer to{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="underline hover:text-primary">
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">
            3. Changes to This Policy
          </h2>
          <p className="text-sm text-muted-foreground">
            We may update this privacy policy from time to time. Any changes
            will be reflected on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-2">4. Contact Us</h2>
          <p className="text-sm text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at W216632608 at student and then add .hccs.edu.
          </p>
        </section>
      </div>

      <Separator className="my-8" />
      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
