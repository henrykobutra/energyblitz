"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useFeaturePreviewDialog } from "@/contexts/FeaturePreviewContext"

export function FeaturePreviewDialog() {
  const { isOpen, closeDialog } = useFeaturePreviewDialog()

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
            <span role="img" aria-label="pray" className="text-3xl">🙏</span>
            Thank You
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            for checking out EnergyBlitz
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            The feature you&apos;re trying to access is not available in this technical preview.
            We&apos;d love to build it with your input!
          </p>
          <div className="flex justify-center">
            <Button asChild variant="default" onClick={closeDialog}>
              <Link href="/about" className="flex items-center gap-2">
                Learn More
                <span className="text-xs">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

