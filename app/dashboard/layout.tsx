import Link from "next/link";
import React from "react";
import { FeaturePreviewDialogProvider } from "@/contexts/FeaturePreviewContext";
import { FeaturePreviewDialog } from "@/components/FeaturePreviewDialog";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <FeaturePreviewDialogProvider>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-semibold text-gray-800">
                ⚡️ EnergyBlitz
              </h1>
            </Link>
            <span className="ml-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Preview Version
            </span>
          </div>
          <nav>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About This Project
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <p className="text-xs">
            © 2024 EnergyBlitz. Technical Preview. All rights reserved. Varit
            Kobutra and Sittichai Chaikamol.
          </p>
          <div>
            <Link href="/terms" className="mr-4 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
      <FeaturePreviewDialog />
      </FeaturePreviewDialogProvider>
    </div>
  );
}
