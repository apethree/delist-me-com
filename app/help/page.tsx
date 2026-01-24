"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const faqs = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How does DelistMe work?",
        answer: "DelistMe scans over 50 data broker sites to find your personal information. Once found, we automatically submit opt-out requests on your behalf to have your data removed. We then continuously monitor these sites to ensure your information doesn't reappear."
      },
      {
        question: "How long does it take to remove my data?",
        answer: "Most data brokers process removal requests within 24-72 hours. However, some may take up to 45 days depending on their policies. We track every request and notify you once removals are confirmed."
      },
      {
        question: "Do I need to provide any personal information?",
        answer: "We only need your phone number to verify your identity and scan for your information. We never sell or share your data with third parties."
      }
    ]
  },
  {
    category: "Security & Privacy",
    items: [
      {
        question: "Is my data secure with DelistMe?",
        answer: "Absolutely. We use bank-level encryption (AES-256) to protect all data. Your information is only used to submit removal requests and is never stored longer than necessary."
      },
      {
        question: "What is your data retention policy?",
        answer: "We follow a zero-data persistence model. Once your removal requests are submitted, we delete your personal information from our systems. Only your account credentials are retained for login purposes."
      },
      {
        question: "Can DelistMe access my accounts or passwords?",
        answer: "No. DelistMe only interacts with public data broker websites. We never access your personal accounts, email, or any private information beyond what's needed for data removal."
      }
    ]
  },
  {
    category: "Account & Billing",
    items: [
      {
        question: "Is the privacy scan free?",
        answer: "Yes, the initial privacy scan is completely free. You can see which data brokers have your information before deciding to proceed with removals."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time from your dashboard. There are no cancellation fees or long-term commitments."
      },
      {
        question: "How do I delete my DelistMe account?",
        answer: "You can delete your account from the Settings page in your dashboard. All your data will be permanently removed within 24 hours of deletion."
      }
    ]
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Help Center
            </h1>
            <p className="mt-3 text-muted-foreground">
              Find answers to common questions about DelistMe.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-2xl border-border/60 bg-muted/30 pl-11 text-base"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-8">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-3xl bg-muted/30 p-8 text-center">
                <p className="text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
              </div>
            ) : (
              filteredFaqs.map((category) => (
                <div key={category.category}>
                  <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.items.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="rounded-2xl border-none bg-muted/30 px-6"
                      >
                        <AccordionTrigger className="py-5 text-left font-medium hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 rounded-3xl bg-muted/30 p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground">Still have questions?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our support team is available 24/7 to help.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
