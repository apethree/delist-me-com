"use client"

import * as React from "react"
import { cn } from "@delistme/ui"

interface SuggestionsProps {
  children: React.ReactNode
  className?: string
}

export function Suggestions({ children, className }: SuggestionsProps) {
  return (
    <div className={cn(
      "flex flex-wrap justify-center gap-2",
      className
    )}>
      {children}
    </div>
  )
}

interface SuggestionProps {
  suggestion: string
  onClick?: () => void
  className?: string
}

export function Suggestion({ suggestion, onClick, className }: SuggestionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm font-medium bg-white hover:bg-slate-50 text-slate-700",
        "border border-slate-200 px-4 py-2 rounded-full",
        "transition-all shadow-sm hover:shadow hover:border-slate-300",
        "dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700",
        "dark:hover:bg-slate-800 dark:hover:border-slate-600",
        className
      )}
    >
      {suggestion}
    </button>
  )
}
