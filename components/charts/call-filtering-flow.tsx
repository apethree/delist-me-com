"use client"

import { ArrowRight, PhoneIncoming, ShieldCheck, XOctagon } from "lucide-react"

export function CallFilteringFlow() {
   return (
      <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
         {/* Step 1: Incoming Call */}
         <div className="flex items-center gap-4 p-4 rounded-xl border border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10">
            <div className="h-10 w-10 shrink-0 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
               <PhoneIncoming className="h-5 w-5 text-red-600" />
            </div>
            <div>
               <div className="font-semibold text-slate-900 dark:text-white">Incoming Spam Call</div>
               <div className="text-xs text-slate-600 dark:text-slate-400">Likely Robocaller</div>
            </div>
            <div className="ml-auto text-xs font-mono text-slate-500 dark:text-slate-400">0.1s</div>
         </div>

         <div className="flex justify-center -my-2">
            <ArrowRight className="h-5 w-5 text-slate-300 rotate-90" />
         </div>

         {/* Step 2: AI Analysis */}
         <div className="flex items-center gap-4 p-4 rounded-xl border border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
               <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
               <div className="font-semibold text-slate-900 dark:text-white">AI Analysis</div>
               <div className="text-xs text-slate-600 dark:text-slate-400">Pattern match confirmed</div>
            </div>
            <div className="ml-auto text-xs font-mono text-slate-500 dark:text-slate-400">0.3s</div>
         </div>

         <div className="flex justify-center -my-2">
            <ArrowRight className="h-5 w-5 text-slate-300 rotate-90" />
         </div>

         {/* Step 3: Blocked */}
         <div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10">
            <div className="h-10 w-10 shrink-0 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
               <XOctagon className="h-5 w-5 text-green-600" />
            </div>
            <div>
               <div className="font-semibold text-slate-900 dark:text-white">Auto-Blocked</div>
               <div className="text-xs text-slate-600 dark:text-slate-400">Phone never rings</div>
            </div>
            <div className="ml-auto">
               <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                  Safe
               </span>
            </div>
         </div>
      </div>
   )
}
