"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield, Eye, Trash2, PhoneOff, Check, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/phone-input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director",
    image: "/testimonials/avatar-1.jpg",
    quote: "I was getting 10+ spam calls a day. Within a week of using DelistMe, it dropped to almost zero. Life-changing.",
    reduction: "94%"
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    image: "/testimonials/avatar-2.jpg",
    quote: "As someone who values privacy, I was skeptical. But DelistMe actually delivers. My data was removed from 47 brokers.",
    reduction: "47 sites"
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    image: "/testimonials/avatar-3.jpg",
    quote: "The spam calls were affecting my business line. DelistMe fixed that. Now I only get calls from real customers.",
    reduction: "89%"
  },
  {
    name: "Michael Park",
    role: "Graduate Student",
    image: "/testimonials/avatar-4.jpg",
    quote: "I never realized how exposed my data was until DelistMe showed me. The dashboard makes everything transparent.",
    reduction: "52 sites"
  }
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-success" />
              <AnimatedCounter end={2847293} /> spam calls blocked this month
            </p>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Tired of spam calls?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Data brokers sell your phone number to telemarketers. We find where your data is exposed and remove it automatically.
            </p>

            {/* Phone Input */}
            <div className="mx-auto mt-10 max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    disabled={isLoading}
                    className="h-14 rounded-2xl border-border bg-card px-4 text-center text-lg shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20"
                  />
                  {error && (
                    <p className="mt-3 text-center text-sm text-destructive">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-primary text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  disabled={isLoading || phone.length !== 10}
                >
                  {isLoading ? (
                    "Scanning..."
                  ) : (
                    <>
                      Start Free Privacy Scan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                No credit card required. See results in 60 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Phone Mockup / Visual Section */}
        <section className="overflow-hidden bg-foreground px-6 py-20 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Left: Visual representation */}
              <div className="relative mx-auto w-full max-w-sm">
                <div className="aspect-[3/4] rounded-[2.5rem] bg-background/5 p-4">
                  <div className="flex h-full flex-col rounded-[2rem] bg-background p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">Incoming Calls</span>
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                    
                    {/* Spam calls being blocked */}
                    <div className="space-y-3">
                      {[
                        { number: "+1 (555) 123-4567", label: "Likely Spam", blocked: true },
                        { number: "+1 (800) 999-8888", label: "Telemarketer", blocked: true },
                        { number: "+1 (555) 987-6543", label: "Robocall", blocked: true },
                        { number: "Mom", label: "", blocked: false },
                        { number: "+1 (555) 456-7890", label: "Scam Risk", blocked: true },
                      ].map((call, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center justify-between rounded-xl p-3 ${
                            call.blocked ? 'bg-destructive/10 line-through opacity-60' : 'bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              call.blocked ? 'bg-destructive/20' : 'bg-success/20'
                            }`}>
                              {call.blocked ? (
                                <PhoneOff className="h-4 w-4 text-destructive" />
                              ) : (
                                <Check className="h-4 w-4 text-success" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{call.number}</p>
                              {call.label && (
                                <p className={`text-xs ${call.blocked ? 'text-destructive' : 'text-muted-foreground'}`}>
                                  {call.label}
                                </p>
                              )}
                            </div>
                          </div>
                          {call.blocked && (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto pt-4">
                      <div className="rounded-xl bg-primary/10 p-3 text-center">
                        <p className="text-sm font-semibold text-primary">4 spam calls blocked today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="text-background">
                <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                  See the difference in real-time
                </h2>
                <p className="mt-4 text-lg text-background/70">
                  Our users report an average 87% reduction in spam calls within the first two weeks.
                </p>
                
                <div className="mt-8 space-y-4">
                  {[
                    "We scan 50+ data broker sites for your info",
                    "Submit automated opt-out requests",
                    "Monitor and re-remove when data reappears"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-background/90">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Video placeholder */}
                <div className="mt-8">
                  <button className="group flex items-center gap-3 text-sm text-background/70 transition-colors hover:text-background">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors group-hover:bg-background/20">
                      <Play className="h-4 w-4 text-background" />
                    </div>
                    Watch how it works (2 min)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-6 py-24 md:py-32">
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
                  description: "We submit opt-out requests to 50+ data brokers on your behalf. No manual work required."
                },
                {
                  icon: Eye,
                  title: "24/7 Monitoring",
                  description: "Continuous scans detect when your data reappears and automatically removes it again."
                },
                {
                  icon: Shield,
                  title: "Zero-Data Persistence",
                  description: "We never store or sell your personal information. Your data stays yours. Period."
                }
              ].map((feature, i) => (
                <div key={i} className="rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted/50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Real people. Real results.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands who have taken back their privacy
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="rounded-3xl bg-background p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                      {testimonial.reduction} reduction
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/80">{`"${testimonial.quote}"`}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Built by engineers who were tired of spam too.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Our team includes former engineers from Google and Apple who understand data privacy at scale. We built DelistMe because we were frustrated with the same problem you have.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full border border-border px-4 py-2">Ex-Google Privacy Team</span>
              <span className="rounded-full border border-border px-4 py-2">Ex-Apple Security</span>
              <span className="rounded-full border border-border px-4 py-2">Stanford CS</span>
              <span className="rounded-full border border-border px-4 py-2">YC W24</span>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-muted/50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start free. Upgrade when you are ready for full protection.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-3xl p-8 ${
                    plan.highlighted 
                      ? 'bg-foreground text-background shadow-2xl' 
                      : 'bg-background border border-border'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
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
                        <Check className={`h-4 w-4 ${plan.highlighted ? 'text-primary' : 'text-success'}`} />
                        <span className={`text-sm ${plan.highlighted ? 'text-background/90' : 'text-foreground/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild
                    className={`w-full rounded-xl ${
                      plan.highlighted 
                        ? 'bg-background text-foreground hover:bg-background/90' 
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    <Link href={plan.name === "Free Scan" ? "/" : "/login"}>
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Take back your privacy today.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Start your free scan in under 60 seconds. No credit card required.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-14 rounded-2xl bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                Start Free Scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
