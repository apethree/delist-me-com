"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Server, CheckCircle2 } from "lucide-react"
import { AppleLogo, GoogleLogo, NasaLogo, MicrosoftLogo } from "@/components/logos"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-foreground selection:text-background">
      
      {/* 1. Hero Section - Clean, minimal */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Shield className="w-4 h-4" />
            Trusted by thousands of privacy-conscious users
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
            We build 
            <br className="hidden md:block" />
            peace of mind.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            In an age of relentless data harvesting, privacy is no longer optional—it's essential. We use advanced AI to reclaim your privacy and give you back control of your digital life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Start Your Free Scan <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Background Decorative - subtle */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] dark:bg-blue-900/10" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[100px] dark:bg-slate-800/20" />
        </div>
      </section>

      {/* 2. Visual Transition - Mission image */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden aspect-[21/9] relative shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
           <Image 
             src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2400" 
             alt="Abstract representation of digital protection and privacy"
             fill
             className="object-cover"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 via-slate-900/40 to-transparent" />
           <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white max-w-xl">
              <p className="text-sm font-mono tracking-widest uppercase opacity-80 mb-3">Our Mission</p>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">To make digital privacy the default, not the exception.</h3>
           </div>
        </div>
      </section>

      {/* 3. Trust Section - World-Class Engineering Team */}
      <section className="py-24 md:py-32 bg-gray-50 dark:bg-gray-900/40 px-6 border-y border-gray-200 dark:border-gray-800">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
               <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-8">
                 <Shield className="w-8 h-8 text-white" />
               </div>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-gray-900 dark:text-white">
                 Built by world-class
                 <br />
                 security engineers.
               </h2>
               <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                 Our team is comprised of former security engineers and researchers from the world's most demanding technology organizations. We've protected billions of users—and now we're protecting you.
               </p>
            </div>

            {/* Credibility Grid - Prominent logos */}
            <div className="bg-white dark:bg-black rounded-3xl p-8 md:p-12 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl">
              <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 mb-10 uppercase tracking-widest">Our team has secured</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
                 {/* Apple */}
                 <div className="flex flex-col items-center gap-4 group">
                    <div className="h-16 w-16 text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-110">
                      <AppleLogo className="w-full h-full" />
                    </div>
                    <div className="text-center">
                      <span className="block text-base font-semibold text-gray-900 dark:text-white">Apple</span>
                      <span className="text-sm text-gray-500">Security Engineering</span>
                    </div>
                 </div>
                 
                 {/* Google */}
                 <div className="flex flex-col items-center gap-4 group">
                    <div className="h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                      <GoogleLogo className="w-full h-full" />
                    </div>
                    <div className="text-center">
                      <span className="block text-base font-semibold text-gray-900 dark:text-white">Google</span>
                      <span className="text-sm text-gray-500">Cloud Security</span>
                    </div>
                 </div>

                 {/* NASA */}
                 <div className="flex flex-col items-center gap-4 group">
                    <div className="h-14 w-auto transition-transform duration-300 group-hover:scale-110">
                       <NasaLogo className="h-14 w-auto dark:invert" />
                    </div>
                    <div className="text-center">
                      <span className="block text-base font-semibold text-gray-900 dark:text-white">NASA</span>
                      <span className="text-sm text-gray-500">JPL Systems</span>
                    </div>
                 </div>

                 {/* Microsoft */}
                 <div className="flex flex-col items-center gap-4 group">
                    <div className="h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                      <MicrosoftLogo className="w-full h-full" />
                    </div>
                    <div className="text-center">
                      <span className="block text-base font-semibold text-gray-900 dark:text-white">Microsoft</span>
                      <span className="text-sm text-gray-500">Research</span>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>

      {/* 4. Why We Made This - The Story */}
      <section className="py-24 md:py-32 px-6 bg-white dark:bg-black">
         <div className="max-w-6xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] ring-1 ring-gray-200 dark:ring-gray-800">
                 <Image 
                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                   alt="Team working together"
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              
              <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                   Why we built DelistMe
                 </h2>
                 <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                   <p>
                     <strong className="text-gray-900 dark:text-white">We've seen the problem from the inside.</strong> After spending years at the world's biggest tech companies, we understood how data flows—and how easily it's exploited.
                   </p>
                   <p>
                     Data brokers collect your information from hundreds of sources: public records, purchase histories, social media, and countless other touchpoints. They then sell this data to anyone willing to pay—including scammers, spammers, and bad actors.
                   </p>
                   <p>
                     We built DelistMe because <strong className="text-gray-900 dark:text-white">we believe you deserve the same level of protection</strong> that Fortune 500 executives receive. Privacy shouldn't be a luxury—it should be a right.
                   </p>
                 </div>
              </div>
           </div>
         </div>
      </section>

      {/* 5. Key Values / Trust Pillars */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30 px-6 border-y border-gray-200 dark:border-gray-800">
         <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">Why trust DelistMe?</h2>
             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
               We've built transparency and security into every aspect of our service.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-white dark:bg-black rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm hover:shadow-xl transition-shadow">
               <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                 <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Your data stays yours</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                 We never sell, share, or monetize your personal information. Our business model is simple: you pay us to protect you, and we work for you—not advertisers.
               </p>
             </div>
             
             {/* Card 2 */}
             <div className="bg-white dark:bg-black rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm hover:shadow-xl transition-shadow">
               <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                 <Server className="w-6 h-6 text-slate-600 dark:text-slate-400" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Enterprise-grade security</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                 We use the same security infrastructure trusted by Fortune 500 companies. End-to-end encryption, SOC 2 compliance, and continuous monitoring protect your data 24/7.
               </p>
             </div>
             
             {/* Card 3 */}
             <div className="bg-white dark:bg-black rounded-2xl p-8 ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm hover:shadow-xl transition-shadow">
               <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                 <CheckCircle2 className="w-6 h-6 text-slate-600 dark:text-slate-400" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Transparent results</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                 See exactly what data brokers have your information, track removal progress in real-time, and receive verification when your data is gone. No black boxes.
               </p>
             </div>
           </div>
         </div>
      </section>

      {/* 6. Stats/Social Proof - Matching site theme */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">500K+</div>
              <p className="text-gray-600 dark:text-gray-400">Records Removed</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
              <p className="text-gray-600 dark:text-gray-400">Data Brokers Monitored</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">99.7%</div>
              <p className="text-gray-600 dark:text-gray-400">Removal Success Rate</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Monitoring & Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <section className="py-24 md:py-32 px-6 bg-gray-900 text-white">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Ready to take back your privacy?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join thousands of users who have trusted DelistMe to protect their personal information and restore their peace of mind.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <Link href="/signup">
                 <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 h-14 text-lg w-full sm:w-auto shadow-xl">
                   Start Free Scan
                 </Button>
               </Link>
               <Link href="/pricing">
                 <Button size="lg" className="bg-transparent border border-gray-500 text-white hover:bg-gray-800 rounded-full px-10 h-14 text-lg w-full sm:w-auto">
                   View Pricing
                 </Button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  )
}
