"use client"

import React from "react"
import { Check, Shield, Smartphone, Zap, ArrowRight, LayoutDashboard, Download } from "lucide-react"
import { Button } from "@delistme/ui"
import Link from "next/link"

export function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto md:border-x border-gray-800">
      
      {/* Grid Container - Permanent Dark Mode */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-800 gap-px border-b border-gray-800">
        
        {/* Section Header */}
        <div className="col-span-1 md:col-span-3 bg-black p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-white max-w-2xl">
              From signup to silence in three simple steps. No complex setup required.
            </p>
        </div>

        {/* Step 1: Register */}
        <div className="bg-black group hover:bg-gray-900/40 transition-colors relative overflow-hidden h-full flex flex-col">
          <div className="p-8 md:p-10 flex-1 flex flex-col items-center justify-center min-h-[240px] border-b border-gray-800/50 bg-black">
             {/* Visual: Mini Form */}
             <div className="w-48 bg-gray-900 rounded-lg shadow-sm border border-gray-700 p-4 transform transition-transform group-hover:scale-105 duration-500">
                <div className="flex flex-col gap-3">
                   <div className="h-2 w-16 bg-gray-700 rounded-full mb-1"></div>
                   <div className="h-8 w-full bg-gray-800 border border-gray-700 rounded flex items-center px-2">
                      <div className="h-1.5 w-24 bg-gray-600 rounded-full"></div>
                   </div>
                   <div className="h-8 w-full bg-gray-800 border border-gray-700 rounded flex items-center px-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-1"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-1"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-1"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-1"></div>
                       <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                   </div>
                   <div className="h-8 w-full bg-blue-600 rounded flex items-center justify-center mt-1">
                      <div className="h-1.5 w-12 bg-blue-400 rounded-full"></div>
                   </div>
                </div>

             </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-3">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold font-mono">1</span>
               <h3 className="text-lg font-semibold text-white">Register</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Create your account in seconds. Security and privacy is our priority from day one.
            </p>
            <Link href="/auth/login">
                <Button className="w-full bg-white text-black hover:bg-gray-200 border-transparent font-medium">
                    Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
          </div>
        </div>

        {/* Step 2: Download App */}
        <div className="bg-black group hover:bg-gray-900/40 transition-colors relative overflow-hidden h-full flex flex-col">
          <div className="p-8 md:p-10 flex-1 flex flex-col items-center justify-center min-h-[240px] border-b border-gray-800/50 bg-black">
             {/* Visual: Phone Interface */}
             <div className="relative w-32 h-44 bg-gray-900 border-2 border-gray-700 rounded-xl shadow-sm p-2 flex flex-col items-center transform transition-transform group-hover:scale-105 duration-500">
                <div className="w-8 h-1 bg-gray-700 rounded-full mb-4"></div>
                <div className="grid grid-cols-3 gap-2 w-full px-1">
                   {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className={`aspect-square rounded-md ${i === 5 ? 'bg-blue-600 shadow-md shadow-blue-500/20' : 'bg-gray-800'}`}></div>
                   ))}
                </div>
                 {/* Floating Download Badge */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-gray-700 shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1.5 whitespace-nowrap animate-in fade-in zoom-in duration-700">
                    <Smartphone className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-medium text-white">App Installed</span>
                 </div>
             </div>
          </div>
          <div className="p-8">
             <div className="flex items-center gap-3 mb-3">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold font-mono">2</span>
               <h3 className="text-lg font-semibold text-white">Download App</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Get the DelistMe app on iOS or Android to activate your secure virtual line.
            </p>
            <Button className="w-full bg-white text-black hover:bg-gray-200 border-transparent font-medium">
                Download App <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Step 3: We Handle It */}
        <div className="bg-black group hover:bg-gray-900/40 transition-colors relative overflow-hidden h-full flex flex-col">
          <div className="p-8 md:p-10 flex-1 flex flex-col items-center justify-center min-h-[240px] border-b border-gray-800/50 bg-black">
             {/* Visual: Status Stack */}
             <div className="relative flex flex-col items-center gap-3 py-6">
                {/* Badge 1 */}
                <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg px-4 py-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 w-48 z-30">
                   <div className="w-5 h-5 rounded-full bg-green-900/40 text-green-400 flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>
                   <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">Spam Blocked</span>
                      <span className="text-[10px] text-slate-400">Just now</span>
                   </div>
                </div>

                {/* Badge 2 */}
                <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg px-4 py-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 w-48 scale-95 opacity-80 z-20 -mt-2">
                   <div className="w-5 h-5 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0"><Shield className="w-3 h-3" /></div>
                   <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">Identity Secure</span>
                      <span className="text-[10px] text-slate-400">Active protection</span>
                   </div>
                </div>

                {/* Badge 3 */}
                <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg px-4 py-2 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 w-48 scale-90 opacity-60 z-10 -mt-2">
                   <div className="w-5 h-5 rounded-full bg-purple-900/40 text-purple-400 flex items-center justify-center shrink-0"><Zap className="w-3 h-3" /></div>
                   <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-200">Monitoring</span>
                      <span className="text-[10px] text-slate-400">24/7 Scanning</span>
                   </div>
                </div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-2xl transform scale-150 -z-10 pointer-events-none"></div>
             </div>
          </div>
          <div className="p-8">
             <div className="flex items-center gap-3 mb-3">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold font-mono">3</span>
               <h3 className="text-lg font-semibold text-white">We Handle It</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We monitor data brokers and filter calls 24/7. Sit back and enjoy the silence.
            </p>
            <Link href="/dashboard">
                <Button className="w-full bg-white text-black hover:bg-gray-200 border-transparent font-medium">
                    View Dashboard <LayoutDashboard className="w-4 h-4 ml-2" />
                </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
