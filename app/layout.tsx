import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnergyBlitz",
  description:
    "EnergyBlitz is a web app that allows you to visualize energy consumption data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡️</text></svg>"
        />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
