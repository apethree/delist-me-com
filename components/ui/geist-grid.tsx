"use client"

import { cn } from "@/lib/utils"
import React from "react"

// Vercel Geist-style Grid System
// Creates a structural grid with visible soft gray border lines

interface GeistGridProps {
  children: React.ReactNode
  columns?: number
  rows?: number
  className?: string
  hideRowGuides?: boolean
  hideColumnGuides?: boolean
}

interface GeistCellProps {
  children?: React.ReactNode
  colSpan?: number
  rowSpan?: number
  solid?: boolean // When true, cell has solid background (occludes grid lines)
  className?: string
}

// Grid Guide Line Color
const GUIDE_COLOR = "rgb(229 231 235)" // Tailwind gray-200 equivalent

export function GeistGrid({
  children,
  columns = 4,
  rows = 4,
  className,
  hideRowGuides = false,
  hideColumnGuides = false,
}: GeistGridProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Grid Lines Container (Background) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {/* Generate grid guide lines */}
        {Array.from({ length: columns * rows }).map((_, i) => {
          const col = i % columns
          const row = Math.floor(i / columns)
          return (
            <div
              key={i}
              className="relative"
              style={{
                borderRight: !hideColumnGuides && col < columns - 1 ? `1px solid ${GUIDE_COLOR}` : 'none',
                borderBottom: !hideRowGuides && row < rows - 1 ? `1px solid ${GUIDE_COLOR}` : 'none',
              }}
            />
          )
        })}
      </div>
      
      {/* Content Container (Foreground) */}
      <div 
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, minmax(auto, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function GeistCell({
  children,
  colSpan = 1,
  rowSpan = 1,
  solid = false,
  className,
}: GeistCellProps) {
  return (
    <div
      className={cn(
        "relative",
        solid && "bg-white dark:bg-black", // Solid cells occlude grid lines
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  )
}

// Simplified Full-Page Grid Wrapper
// This creates the characteristic Vercel look with a container that has grid lines
export function GeistPageGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative bg-white dark:bg-black", className)}>
      {/* Outer border */}
      <div className="border-x border-gray-200 dark:border-gray-800 max-w-7xl mx-auto">
        {/* Vertical column guides (3-column layout) */}
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden md:flex">
          <div className="flex-1 border-r border-gray-200 dark:border-gray-800" />
          <div className="flex-1 border-r border-gray-200 dark:border-gray-800" />
          <div className="flex-1" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}

// Simple Section Divider with horizontal line
export function GeistDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full border-t border-gray-200 dark:border-gray-800", className)} />
  )
}
