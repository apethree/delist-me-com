"use client"

import { ArrowDown, PhoneIncoming, ShieldCheck, Ban, Check } from "lucide-react"

export function CallFilteringFlow() {
   return (
      <div className="flex flex-col w-full max-w-sm mx-auto relative">
         {/* Connecting Line */}
         <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-zinc-700 via-zinc-600 to-transparent" />

         {/* Step 1: Incoming Call */}
         <div className="relative flex items-center gap-6 p-4 group">
            <div className="relative z-10 h-8 w-8 shrink-0 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center">
               <PhoneIncoming className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Incoming Call</p>
                  <span className="text-[10px] font-mono text-zinc-500">00:00.0s</span>
               </div>
               <p className="text-xs text-zinc-400 truncate">Unknown Caller ID</p>
            </div>
         </div>

         {/* Step 2: Analysis */}
         <div className="relative flex items-center gap-6 p-4 group">
            <div className="relative z-10 h-8 w-8 shrink-0 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center">
               <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-10" />
               <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Analyzing Pattern</p>
                  <span className="text-[10px] font-mono text-zinc-500">00:00.1s</span>
               </div>
               <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                     Global Blocklist
                  </span>
                  <span className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                     AI Score: 98%
                  </span>
               </div>
            </div>
         </div>

         {/* Step 3: Action */}
         <div className="relative flex items-center gap-6 p-4 group">
            <div className="relative z-10 h-8 w-8 shrink-0 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center">
               <Ban className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Auto-Blocked</p>
                  <span className="text-[10px] font-mono text-zinc-500">00:00.2s</span>
               </div>
               <p className="text-xs text-zinc-400">Call rejected silently</p>
            </div>
         </div>
         
      </div>
   )
}
