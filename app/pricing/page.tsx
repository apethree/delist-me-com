import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const pricingPlans = [
  {
    name: "Free Scan",
    price: "$0",
    description: "See where your data is exposed",
    features: [
      "One-time privacy scan",
      "View all data brokers with your info",
      "Basic removal report",
      "No credit card required"
    ],
    cta: "Start Free Scan",
    href: "/",
    highlighted: false
  },
  {
    name: "Annual",
    price: "$89",
    period: "/year",
    description: "Complete protection, best value",
    features: [
      "Everything in Free, plus:",
      "Continuous 24/7 monitoring",
      "Automated removal requests",
      "50+ data broker coverage",
      "Monthly progress reports",
      "Priority email support",
      "Re-removal when data reappears"
    ],
    cta: "Get Protected",
    href: "/login",
    highlighted: true,
    badge: "Save 38%"
  },
  {
    name: "Monthly",
    price: "$12",
    period: "/month",
    description: "Flexible month-to-month protection",
    features: [
      "Everything in Free, plus:",
      "Continuous 24/7 monitoring",
      "Automated removal requests",
      "50+ data broker coverage",
      "Monthly progress reports",
      "Cancel anytime"
    ],
    cta: "Start Monthly",
    href: "/login",
    highlighted: false
  }
]

const faqs = [
  {
    question: "How does the free scan work?",
    answer: "Enter your phone number and we'll scan 50+ data broker sites to show you exactly where your personal information is being sold. No credit card required."
  },
  {
    question: "How long until I see results?",
    answer: "Most users see a significant reduction in spam calls within 2-4 weeks. Data brokers are legally required to process opt-out requests within 10-45 days."
  },
  {
    question: "What's the difference between free and paid?",
    answer: "The free scan shows you where your data is exposed. Paid plans actually submit removal requests and continuously monitor for when your data reappears."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no contracts or cancellation fees. You can cancel your subscription at any time from your dashboard."
  },
  {
    question: "Is my data safe with DelistMe?",
    answer: "We use bank-level encryption and never sell or share your personal information. We only use your data to submit removal requests on your behalf."
  }
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free. Upgrade when you are ready for full protection.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan, i) => (
                <div 
                  key={i} 
                  className={`relative rounded-3xl p-8 ${
                    plan.highlighted 
                      ? 'bg-foreground text-background shadow-2xl scale-105' 
                      : 'bg-card border border-border'
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
                      <li key={j} className="flex items-start gap-3">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? 'text-primary' : 'text-success'}`} />
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
                    <Link href={plan.href}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-muted/50 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Compare plans
            </h2>
            
            <div className="overflow-hidden rounded-2xl border border-border bg-background">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Feature</th>
                    <th className="p-4 text-center text-sm font-medium text-muted-foreground">Free</th>
                    <th className="p-4 text-center text-sm font-medium text-foreground">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { feature: "Privacy scan", free: true, paid: true },
                    { feature: "View exposed data", free: true, paid: true },
                    { feature: "Automated removal requests", free: false, paid: true },
                    { feature: "24/7 monitoring", free: false, paid: true },
                    { feature: "50+ data brokers", free: true, paid: true },
                    { feature: "Re-removal protection", free: false, paid: true },
                    { feature: "Progress reports", free: false, paid: true },
                    { feature: "Priority support", free: false, paid: true },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="p-4 text-sm text-foreground">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.free ? (
                          <Check className="mx-auto h-4 w-4 text-success" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.paid ? (
                          <Check className="mx-auto h-4 w-4 text-success" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Frequently asked questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background md:text-4xl">
              Ready to stop spam calls?
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Join thousands who have taken back their privacy.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-14 rounded-2xl bg-background px-10 text-base font-semibold text-foreground hover:bg-background/90"
            >
              <Link href="/">
                Start Free Scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
