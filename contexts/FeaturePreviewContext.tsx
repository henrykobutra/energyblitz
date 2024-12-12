"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FeaturePreviewDialogContextType {
  openDialog: () => void
  closeDialog: () => void
  isOpen: boolean
}

const FeaturePreviewDialogContext = createContext<FeaturePreviewDialogContextType | undefined>(undefined)

export function FeaturePreviewDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <FeaturePreviewDialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
    </FeaturePreviewDialogContext.Provider>
  )
}

export function useFeaturePreviewDialog() {
  const context = useContext(FeaturePreviewDialogContext)
  if (context === undefined) {
    throw new Error('useFeaturePreviewDialog must be used within a FeaturePreviewDialogProvider')
  }
  return context
}

