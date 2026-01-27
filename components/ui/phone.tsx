"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  address?: string
  children?: React.ReactNode
}

/**
 * A Vercel/Geist-style phone frame component.
 * Recreates the look of https://vercel.com/geist/phone
 */
export function Phone({ address = "delistme.com", children, className, ...props }: PhoneProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)} {...props}>
      {/* Phone Frame */}
      <div className="relative z-10 overflow-hidden rounded-[2.5rem] border-[6px] border-slate-900 bg-slate-950 shadow-xl ring-1 ring-white/10 dark:border-slate-800">
        
        {/* Dynamic Island Area */}
        <div className="absolute top-0 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-black">
          <div className="absolute top-0 right-3 h-2 w-2 rounded-full bg-slate-800/50" />
        </div>

        {/* Status Bar */}
        <div className="flex h-12 w-full items-center justify-between px-6 pt-3 text-[10px] font-medium text-white">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
             <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
             <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg> 
          </div>
        </div>

        {/* Address Bar (Browser UI) */}
        {address && (
           <div className="px-3 pb-3">
             <div className="flex items-center gap-2 rounded-xl bg-slate-900/50 px-3 py-2 text-[10px] text-slate-400 backdrop-blur-md">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="flex-1 text-center font-medium">{address}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </div>
           </div>
        )}
        
        {/* Screen Content */}
        <div className="relative bg-white dark:bg-black min-h-[480px]">
           {children}
           
           {/* Home Indicator */}
           <div className="absolute bottom-1 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-slate-800/20 dark:bg-white/20" />
        </div>
      </div>
      
      {/* Side Buttons */}
      <div className="absolute top-24 -left-[2px] h-8 w-[2px] rounded-l-sm bg-slate-800" /> {/* Volume Up */}
      <div className="absolute top-36 -left-[2px] h-8 w-[2px] rounded-l-sm bg-slate-800" /> {/* Volume Down */}
      <div className="absolute top-28 -right-[2px] h-12 w-[2px] rounded-r-sm bg-slate-800" /> {/* Power */}
    </div>
  )
}
