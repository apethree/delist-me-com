import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { MobileBackButton } from "@/components/mobile-back-button"
import { FaqSearch } from "@/components/faq-search"

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Help Center | DelistMe",
  description: "Find answers to common questions about DelistMe's data removal services, security, billing, and account management.",
  openGraph: {
    title: "Help Center | DelistMe",
    description: "Find answers to common questions about DelistMe's data removal services, security, billing, and account management.",
  }
}

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
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileBackButton />
      
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

          <FaqSearch faqs={faqs} />

          {/* Contact CTA */}
          <div className="mt-16 rounded-3xl bg-muted/30 p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground">Still have questions?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our support team is available 24/7 to help.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
