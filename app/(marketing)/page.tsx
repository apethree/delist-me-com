
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'DelistMe - Stop Spam Calls',
  description: 'DelistMe removes your personal information from data broker sites to reduce spam calls and protect your privacy.',
}


import React from "react"
import { HeroChat } from "@/components/lazy-components"
import { TestimonialsMarqueeSection } from "@/components/testimonials-marquee"
import { SocialProofSection } from "@/components/social-proof-section"
import { TestimonialsGrid } from "@/components/testimonials-grid"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Search, Package, ShoppingBag, Utensils, Check } from "lucide-react"
import { Phone } from "@/components/ui/phone"
import { SpamReductionChart, CallFilteringFlow, SpamTrendChart } from "@/components/home-visuals"
import { HowItWorks } from "@/components/how-it-works"
import { CheckoutButton } from "@/components/checkout-button"

export default function Home() {
  console.log('DEBUG: Page Home Rendering');
  return (
    <div className="bg-white dark:bg-black min-h-screen font-sans">
      {/* 
         Vercel-style Grid Wrapper 
         Background color determines the border color.
         gap-px creates the borders.
         Items have their own background to cover the wrapper background, leaving only the gap visible.
      */}
      <div className="max-w-7xl mx-auto md:border-x border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-200 dark:bg-gray-800 gap-px">
          
          {/* Testimonials Bar - Spans full width */}
          <div className="col-span-1 md:col-span-4 bg-white dark:bg-black">
            <TestimonialsMarqueeSection />
          </div>


          {/* Main Hero Section - Spans full width */}
          <section className="col-span-1 md:col-span-4 relative bg-white dark:bg-black py-10 md:py-16 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
             <section className="w-full pt-2 md:pt-8 lg:pt-12 pb-12 z-10 relative">
        <div className="container px-4 md:px-6">
          <div className="mb-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4">
              Tired of spam calls?{" "}
              <br className="sm:hidden" />
              <span className="text-green-500 dark:text-green-400">
                We fix that.
              </span>
            </h1>
          </div>
          <div className="w-full max-w-4xl mx-auto">
                <HeroChat />
             </div>
        </div>
      </section>
          </section>

          {/* Social Proof - Spans full width */}
          <div className="col-span-1 md:col-span-4 bg-white dark:bg-black border-t-0">
            <SocialProofSection />
          </div>

          {/* How It Works - 3 Columns */}
          <div id="how-it-works" className="col-span-1 md:col-span-4 bg-white dark:bg-black border-t-0">
            <HowItWorks />
          </div>

          {/* Experience Header - Spans full width */}
          <div className="col-span-1 md:col-span-4 bg-white dark:bg-black py-20 px-6 text-center border-t-0">
             <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
                  Experience the difference.
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Join thousands who have reclaimed their peace and quiet.
                </p>
             </div>
          </div>

          {/* 3-Column Feature Grid 
              Using the main grid's columns naturally. 
          */}
          {/* Feature 1 */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-black h-[400px] group relative overflow-hidden">
             <FeatureCard 
               step="01"
               title="Silence the Noise"
               desc="Drastic reduction in robocalls and spam texts within days. Finally enjoy a quiet phone again."
               image="/images/features/feature-silence.webp"
               overlay="bg-blue-900/40"
             />
          </div>

          {/* Feature 2 - Spans 2 cols on tablet, 1 on desktop if we had 3 cols. 
              But our main grid is 4 columns. 
              Let's make Features span 1.33? No, we need to adapt the layout.
              Option A: Make grid 12 cols.
              Option B: Feature 1 (2 cols), Feature 2 (2 cols), Feature 3 (4 cols -- wide).
              Option C: Make grid 3 cols (md:grid-cols-3) but that breaks alignment with a 4-col stat section below.
              
              Decision: Use nested grid for this section OR change main grid to 12 cols.
              12 cols is flexible. Let's try 12 cols for the main wrapper.
          */}
          
           {/* Feature 2 */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white dark:bg-black h-[400px] group relative overflow-hidden">
             <FeatureCard 
               step="02"
               title="Reclaim Your Time"
               desc="Stop wasting time screening calls. We filter out the junk so you only answer what matters."
               image="/images/features/feature-reclaim.webp"
               overlay="bg-indigo-900/40"
             />
          </div>

          {/* Feature 3 */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2 bg-white dark:bg-black h-[400px] group relative overflow-hidden">
             <FeatureCard 
               step="03"
               title="Peace of Mind"
               desc="Knowing your personal number is protected means no more worrying about who has your data."
               image="/images/features/feature-peace.webp"
               overlay="bg-slate-900/40"
             />
          </div>

          {/* Lifestyle Section */}
          <div className="col-span-1 md:col-span-4 bg-gray-50 dark:bg-gray-900 border-t-0 grid grid-cols-1 md:grid-cols-2 relative overflow-hidden group">
             <div className="h-[400px] md:h-[500px] w-full relative">
                <img 
                  src="/images/happy-people.webp" 
                  alt="Happy people using phones" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
             </div>
             <div className="flex flex-col justify-center p-8 md:p-16 relative">
               <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                  Join 50,000+ people living spam-free.
               </h3>
               <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                 Reclaim your phone, your time, and your peace of mind. Experience the freedom of a clean inbox and silent unknown callers.
               </p>
               <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                        <img src={`/images/avatars/avatar-${i}.webp`} alt="User" />
                     </div>
                   ))}
                 </div>
                 <div className="text-sm font-medium">
                   <span className="text-yellow-500">★★★★★</span> <span className="text-gray-600 dark:text-gray-400">from happy users</span>
                 </div>
               </div>
             </div>
          </div>


          {/* Virtual Phone Section - 2 Columns */}
          {/* Text Side */}
          <div className="col-span-1 md:col-span-2 bg-white dark:bg-black p-8 lg:p-16 flex flex-col justify-center">
             <div className="inline-flex items-center gap-2 rounded-sm border border-gray-200 dark:border-gray-800 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 w-fit">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               New Feature
             </div>
             <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
               Keep your real number <br/>
               <span className="text-blue-600">private forever.</span>
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
               Every time you give your number to a store or website, it gets sold. 
               With DelistMe, you get a dedicated virtual number for those "risky" interactions.
             </p>
             <ul className="space-y-4">
               {[
                 "Use for online shopping & loyalty programs",
                 "Messages forward to your app – not your inbox",
                 "Burn the number if it gets too much spam",
                 "Keep your personal line for friends & family only"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                   <div className="h-5 w-5 rounded-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center shrink-0 bg-white dark:bg-black">
                     <ArrowRight className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                   </div>
                   <span className="font-medium">{item}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Visual Side */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-900/40 p-8 lg:p-16 flex items-center justify-center">
             <div className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50" />
                <Phone className="shadow-2xl shadow-blue-900/20" address="">
                    <div className="flex flex-col h-full bg-slate-50 dark:bg-black">
                       {/* App Header */}
                       <div className="px-6 pt-8 pb-4 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
                          <div className="flex flex-col">
                             <div className="flex justify-between items-center mb-1">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Messages</h3>
                             </div>
                             <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full w-fit">Virtual: (555) 012-3499</span>
                          </div>
                       </div>

                       {/* Message List */}
                       <div className="flex-1 overflow-hidden">
                          {/* Search Bar - Aesthetic only */}
                          <div className="px-4 py-3">
                              <div className="bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center px-3 py-2 gap-2">
                                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
                              </div>
                          </div>

                          <div className="flex flex-col">
                              {/* Message 1 - Delivery */}
                              <div className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer relative group transition-colors">
                                 <div className="w-2 rounded-full bg-blue-500 absolute left-1 top-1/2 -translate-y-1/2 h-2"></div>
                                 <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold shrink-0">
                                     <Package className="w-5 h-5"/>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                     <div className="flex justify-between items-baseline mb-0.5">
                                         <span className="font-semibold text-sm text-gray-900 dark:text-white">FastShip Logistics</span>
                                         <span className="text-[10px] text-gray-400">10:42 AM</span>
                                     </div>
                                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-5 font-medium">
                                         Your package is out for delivery! It will arrive between 2:00 PM - 4:00 PM.
                                     </p>
                                 </div>
                              </div>
                              
                              {/* Message 2 - Verification */}
                              <div className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                 <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0">
                                     <Shield className="w-5 h-5"/>
                                 </div>
                                  <div className="flex-1 min-w-0">
                                     <div className="flex justify-between items-baseline mb-0.5">
                                          <span className="font-semibold text-sm text-gray-900 dark:text-white">SecureAuth</span>
                                         <span className="text-[10px] text-gray-400">Yesterday</span>
                                     </div>
                                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                                         Your verification code is: 4829. Do not share this code.
                                     </p>
                                 </div>
                              </div>

                               {/* Message 3 - Marketing */}
                              <div className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                 <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold shrink-0">
                                     <ShoppingBag className="w-5 h-5"/>
                                 </div>
                                  <div className="flex-1 min-w-0">
                                     <div className="flex justify-between items-baseline mb-0.5">
                                          <span className="font-semibold text-sm text-gray-900 dark:text-white">Fashion Brand</span>
                                         <span className="text-[10px] text-gray-400">Tue</span>
                                     </div>
                                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                         FLASH SALE: 50% OFF everything! Ends tonight.
                                     </p>
                                 </div>
                              </div>

                              {/* Message 4 - Food Delivery */}
                              <div className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer border-l-2 border-transparent hover:border-blue-500 transition-colors">
                                 <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 font-bold shrink-0">
                                     <Utensils className="w-5 h-5"/>
                                 </div>
                                  <div className="flex-1 min-w-0">
                                     <div className="flex justify-between items-baseline mb-0.5">
                                          <span className="font-semibold text-sm text-gray-900 dark:text-white">FoodApp</span>
                                         <span className="text-[10px] text-gray-400">Mon</span>
                                     </div>
                                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                          Your driver is nearby. Enjoy your meal! 🍔
                                     </p>
                                 </div>
                              </div>

                          </div>
                       </div>
                    </div>
                </Phone>
             </div>
          </div>

          {/* New Stats & Diagrams Section */}
          <div className="col-span-1 md:col-span-4 bg-white dark:bg-black border-t-0 py-24">
             <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                   <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-6">
                     Real-time protection.
                   </h2>
                   <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-16">
                     Our AI analyzes call patterns in milliseconds, filtering out spam before your phone even rings.
                   </p>

                   <div className="relative isolate">
                      {/* Vercel-style Grid Container */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                      
                        {/* Card 1: Intelligent Filtering */}
                        <div className="bg-zinc-950 p-8 md:p-12 flex flex-col h-full relative group">
                           {/* Desktop Grid Intersection Plus */}
                           <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-20 hidden md:flex items-center justify-center pointer-events-none">
                              <div className="w-5 h-5 text-zinc-700">
                                <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M7.49991 0.875C7.49991 0.875 7.49991 7.49991 7.49991 7.49991M7.49991 7.49991C7.49991 7.49991 7.49991 14.1249 7.49991 14.1249M7.49991 7.49991C7.49991 7.49991 14.1249 7.49991 14.1249 7.49991M7.49991 7.49991C7.49991 7.49991 0.875 7.49991 0.875 7.49991" stroke="currentColor"></path></svg>
                              </div>
                           </div>

                           <div className="mb-8">
                              <h3 className="text-xl font-semibold mb-2 text-white">Intelligent Filtering</h3>
                              <p className="text-zinc-400 text-sm">How we process every incoming call.</p>
                           </div>
                           <div className="mt-auto">
                              <CallFilteringFlow />
                           </div>
                        </div>

                        {/* Card 2: Impact Analysis */}
                        <div className="bg-white dark:bg-black p-8 md:p-12 flex flex-col h-full relative group">
                            <div className="mb-8">
                               <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Impact Analysis</h3>
                               <p className="text-slate-500 text-sm">Reduction in unwanted interruptions.</p>
                            </div>
                            <div className="flex-1 flex items-center justify-center min-h-[250px] relative">
                               <SpamReductionChart />
                            </div>
                        </div>

                        {/* Card 3: Without DelistMe */}
                        <div className="bg-white dark:bg-black p-8 md:p-12 flex flex-col h-full relative group">
                           <div className="mb-2 flex items-center gap-2">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Without DelistMe</h3>
                           </div>
                           <p className="text-slate-500 text-sm mb-8">Spam calls continue to increase over time.</p>
                           <SpamTrendChart 
                             color="#ef4444" 
                             data={[
                               { month: 'Jan', spam: 5 },
                               { month: 'Feb', spam: 10 },
                               { month: 'Mar', spam: 18 },
                               { month: 'Apr', spam: 28 },
                               { month: 'May', spam: 38 },
                               { month: 'Jun', spam: 50 },
                             ]} 
                           />
                        </div>

                        {/* Card 4: With DelistMe */}
                        <div className="bg-white dark:bg-black p-8 md:p-12 flex flex-col h-full relative group overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                              <Shield className="h-40 w-40 text-blue-600" />
                           </div>
                           <div className="mb-2 flex items-center gap-2">
                               <h3 className="text-xl font-semibold text-slate-900 dark:text-white">With DelistMe</h3>
                               <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                                 Recommended
                               </span>
                           </div>
                           <p className="text-slate-500 text-sm mb-8">Spam volume drops to near zero.</p>
                           <SpamTrendChart 
                             color="#3b82f6" 
                             data={[
                               { month: 'Jan', spam: 45 },
                               { month: 'Feb', spam: 12 },
                               { month: 'Mar', spam: 5 },
                               { month: 'Apr', spam: 2 },
                               { month: 'May', spam: 1 },
                               { month: 'Jun', spam: 0 },
                             ]} 
                           />
                        </div>

                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="col-span-1 md:col-span-4 bg-white dark:bg-black border-t-0">
             <TestimonialsGrid />
          </div>

          {/* Pricing Preview Section - New */}
          <div id="pricing" className="col-span-1 md:col-span-4 bg-white dark:bg-black border-t-0 py-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-6">
                  Simple, transparent pricing.
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                  Start with a free scan to see your exposure. Upgrade for full protection and active removal.
                </p>
                
                {/* Mini Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
                   {/* Free */}
                   <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Free Scan</h3>
                      <div className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">$0</div>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                         <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> One-time privacy scan</li>
                         <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> View exposed data</li>
                      </ul>
                   </div>
                   
                   {/* Pro - Highlighted */}
                   <div className="p-6 rounded-2xl bg-black dark:bg-zinc-900 text-white border border-transparent shadow-xl scale-105 relative ring-1 ring-white/10">
                      <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">RECOMMENDED</div>
                      <h3 className="text-xl font-bold mb-2">Annual</h3>
                      <div className="text-3xl font-bold mb-4">$89<span className="text-sm font-normal opacity-70">/year</span></div>
                      <ul className="space-y-3 text-sm opacity-90 mb-6">
                         <li className="flex gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0" /> Continuous removal</li>
                         <li className="flex gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0" /> 24/7 Monitoring</li>
                         <li className="flex gap-2"><Check className="w-4 h-4 text-blue-400 shrink-0" /> Virtual Phone Number</li>
                      </ul>
                      <CheckoutButton plan="Annual" className="w-full bg-white text-black hover:bg-gray-200">
                        Get Protected
                      </CheckoutButton>
                   </div>

                   {/* Monthly */}
                   <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Monthly</h3>
                      <div className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">$12<span className="text-sm font-normal text-gray-500">/mo</span></div>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
                         <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Continuous removal</li>
                         <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Cancel anytime</li>
                      </ul>
                      <CheckoutButton plan="Monthly" variant="outline" className="w-full">
                        Start Monthly
                      </CheckoutButton>
                   </div>
                </div>

                <Link href="/pricing">
                   <Button size="lg" className="rounded-full px-8 h-12 text-base bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                      Compare Plans <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function FeatureCard({ step, title, desc, image, overlay }: { step: string, title: string, desc: string, image: string, overlay: string }) {
  return (
    <>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-8 text-white z-10">
        <div className="mb-auto font-mono text-lg tracking-widest border-l-2 border-white pl-3 font-bold">
          {step}
        </div>
        
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <h3 className="text-2xl font-bold mb-3 tracking-tight">{title}</h3>
          <p className="text-gray-200 leading-relaxed font-medium opacity-90">
            {desc}
          </p>
        </div>
      </div>
    </>
  )
}
