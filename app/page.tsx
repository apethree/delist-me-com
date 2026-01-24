"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, Eye, Trash2, PhoneOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/phone-input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VideoModal } from "@/components/video-modal"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    image: "/testimonials/avatar-1.jpg",
    quote: "I was getting 10+ spam calls a day. Within a week of using DelistMe, it dropped to almost zero.",
    reduction: "94%"
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    image: "/testimonials/avatar-2.jpg",
    quote: "As someone who values privacy, I was skeptical. But DelistMe actually delivers.",
    reduction: "47 sites"
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    image: "/testimonials/avatar-3.jpg",
    quote: "The spam calls were affecting my business line. DelistMe fixed that.",
    reduction: "89%"
  },
]

const pricingPlans = [
  {
    name: "Free Scan",
    price: "$0",
    description: "See where your data is exposed",
    features: [
      "One-time privacy scan",
      "View all data brokers with your info",
      "Basic removal report"
    ],
    cta: "Start Free Scan",
    highlighted: false
  },
  {
    name: "Annual",
    price: "$89",
    period: "/year",
    description: "Complete protection, best value",
    features: [
      "Continuous monitoring",
      "Automated removal requests",
      "50+ data broker coverage",
      "Monthly progress reports",
      "Priority support"
    ],
    cta: "Get Protected",
    highlighted: true,
    badge: "Most Popular"
  },
  {
    name: "Monthly",
    price: "$12",
    period: "/month",
    description: "Flexible month-to-month protection",
    features: [
      "Continuous monitoring",
      "Automated removal requests",
      "50+ data broker coverage",
      "Monthly progress reports"
    ],
    cta: "Start Monthly",
    highlighted: false
  }
]

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [end])
  
  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function LandingPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code")
      }

      router.push(`/verify?phone=${encodeURIComponent(phone)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async (plan: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })

      if (response.status === 401) {
        router.push("/login")
        return
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error("Checkout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section - Conversion Optimized */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 md:pb-32 md:pt-24">
          {/* Subtle grid background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-destructive/20 to-transparent blur-[120px]" />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            {/* Social Proof Badge */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600" />
              </div>
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground"><AnimatedCounter end={47832} /></span> people blocked spam this week
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Stop <span className="text-[#DC2626] dark:text-[#EF4444]">spam calls</span>
              <br className="hidden sm:block" />
              <span className="text-muted-foreground"> in 60 seconds</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl">
              Your phone number is on 50+ data broker sites. We find them and remove your info automatically.
            </p>

            {/* CTA Section */}
            <div className="mx-auto mt-10 max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-3">
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  disabled={isLoading}
                  className="h-14 w-full border-2 border-border bg-background px-4 text-center text-lg transition-all focus-within:border-foreground focus-within:ring-0"
                />
                {error && (
                  <p className="text-center text-sm text-destructive">{error}</p>
                )}

                <Button
                  type="submit"
                  className="h-14 w-full bg-foreground text-base font-semibold text-background shadow-2xl shadow-foreground/20 transition-all hover:bg-foreground/90 hover:shadow-foreground/30 disabled:opacity-50"
                  disabled={isLoading || phone.length !== 10}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Scanning...
                    </span>
                  ) : (
                    <>
                      Start Free Scan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Signals */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  No credit card
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" />
                  Results in 60 seconds
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  100% private
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Visual Demo */}
        <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-full max-w-xs">
                <div className="aspect-[3/4] rounded-[2rem] border border-border bg-background p-4 shadow-2xl">
                  <div className="flex h-full flex-col rounded-[1.5rem] bg-muted/50 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">Incoming Calls</span>
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { number: "+1 (555) 123-4567", label: "Likely Spam", blocked: true },
                        { number: "+1 (800) 999-8888", label: "Telemarketer", blocked: true },
                        { number: "Mom", label: "", blocked: false },
                        { number: "+1 (555) 456-7890", label: "Scam Risk", blocked: true },
                      ].map((call, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center justify-between rounded-lg p-3 ${
                            call.blocked ? 'bg-destructive/10 opacity-60' : 'bg-background'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              call.blocked ? 'bg-destructive/20' : 'bg-green-500/20'
                            }`}>
                              {call.blocked ? (
                                <PhoneOff className="h-4 w-4 text-destructive" />
                              ) : (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${call.blocked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{call.number}</p>
                              {call.label && (
                                <p className="text-xs text-destructive">{call.label}</p>
                              )}
                            </div>
                          </div>
                          {call.blocked && <X className="h-4 w-4 text-destructive" />}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4">
                      <div className="rounded-lg bg-green-500/10 p-3 text-center">
                        <p className="text-sm font-semibold text-green-600">3 spam calls blocked today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  See the difference in real-time
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our users report an average 87% reduction in spam calls within the first two weeks.
                </p>
                
                <div className="mt-8 space-y-4">
                  {[
                    "We scan 50+ data broker sites for your info",
                    "Submit automated opt-out requests",
                    "Monitor and re-remove when data reappears"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground">
                        <Check className="h-3.5 w-3.5 text-background" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <VideoModal />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                How DelistMe protects you
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Three layers of protection working 24/7
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Trash2,
                  title: "Automated Removal",
                  description: "We submit opt-out requests to 50+ data brokers on your behalf."
                },
                {
                  icon: Eye,
                  title: "24/7 Monitoring",
                  description: "Continuous scans detect when your data reappears."
                },
                {
                  icon: Shield,
                  title: "Zero-Data Persistence",
                  description: "We never store or sell your personal information."
                }
              ].map((feature, i) => (
                <div key={i} className="rounded-2xl border border-border bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-lg">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5">
                    <feature.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Real people. Real results.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands who have taken back their privacy
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="rounded-2xl border border-border bg-background p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-4 inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600">
                    {testimonial.reduction} reduction
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start free. Upgrade when you&apos;re ready.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-2xl p-8 ${
                    plan.highlighted 
                      ? 'border-2 border-foreground bg-foreground text-background shadow-2xl' 
                      : 'border border-border bg-background'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </span>
                  )}
                  
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${plan.highlighted ? 'text-background' : 'text-foreground'}`}>
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <span className={`text-4xl font-bold ${plan.highlighted ? 'text-background' : 'text-foreground'}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className={`ml-1 ${plan.highlighted ? 'text-background/70' : 'text-muted-foreground'}`}>
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className={`mt-2 text-sm ${plan.highlighted ? 'text-background/70' : 'text-muted-foreground'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${plan.highlighted ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={`text-sm ${plan.highlighted ? 'text-background/90' : 'text-foreground/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => plan.name === "Free Scan" ? window.scrollTo({ top: 0, behavior: 'smooth' }) : handleCheckout(plan.name)}
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-background text-foreground hover:bg-background/90' 
                        : 'bg-foreground text-background hover:bg-foreground/90'
                    }`}
                    disabled={isLoading}
                  >
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Take back your privacy today.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Start your free scan in under 60 seconds. No credit card required.
            </p>
            <Button
              size="lg"
              className="mt-8 h-14 bg-foreground px-10 text-base font-semibold text-background shadow-2xl shadow-foreground/20 transition-all hover:bg-foreground/90"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Start Free Scan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
