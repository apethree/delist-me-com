"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const sections = [
  {
    id: "overview",
    title: "Overview",
    tldr: "We collect minimal data, never sell it, and delete it when you ask.",
    content: `DelistMe is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.

We operate on a principle of minimal data collection. We only collect information that is strictly necessary to provide our data removal services to you.`
  },
  {
    id: "data-collection",
    title: "Data We Collect",
    tldr: "Phone number for verification, name and address only when needed for removal requests.",
    content: `We collect the following information:

• Phone Number: Used to verify your identity and search for your information on data broker sites.
• Personal Information: Name, address, and other details may be collected solely to submit opt-out requests to data brokers on your behalf.
• Account Credentials: Email and password for account access (password is securely hashed).
• Usage Data: Anonymous analytics to improve our service (no personal identifiers).`
  },
  {
    id: "data-use",
    title: "How We Use Your Data",
    tldr: "Only to remove your info from data brokers. Nothing else.",
    content: `Your data is used exclusively for:

• Scanning data broker databases for your personal information
• Submitting automated opt-out requests on your behalf
• Verifying removal completions
• Communicating service updates and removal status
• Improving our scanning and removal processes

We never use your data for marketing, advertising, or any purpose unrelated to privacy protection.`
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    tldr: "We never sell your data. We only share with data brokers to request removal.",
    content: `We do not sell, rent, or trade your personal information.

We only share your data with:

• Data Brokers: Strictly limited to submitting opt-out requests. We provide only the minimum information required for each broker to locate and remove your records.
• Service Providers: Secure cloud infrastructure providers who are contractually bound to protect your data.
• Legal Requirements: When required by law or to protect our legal rights.`
  },
  {
    id: "data-retention",
    title: "Data Retention",
    tldr: "We delete your data as soon as removal requests are processed.",
    content: `We follow a zero-data persistence model:

• Personal Information: Deleted within 30 days after removal requests are submitted and confirmed.
• Account Data: Retained only while your account is active.
• Usage Analytics: Anonymized and aggregated, containing no personal identifiers.

You can request immediate deletion of all your data at any time through your dashboard settings.`
  },
  {
    id: "security",
    title: "Security",
    tldr: "Bank-level encryption (AES-256) protects all your data.",
    content: `We implement industry-leading security measures:

• AES-256 encryption for all stored data
• TLS 1.3 for all data in transit
• Regular security audits and penetration testing
• SOC 2 Type II compliance
• Employee access controls and monitoring
• Secure, redundant data centers`
  },
  {
    id: "your-rights",
    title: "Your Rights",
    tldr: "Access, correct, or delete your data anytime. No questions asked.",
    content: `You have the right to:

• Access: View all personal data we hold about you
• Correction: Update any inaccurate information
• Deletion: Permanently remove all your data
• Portability: Export your data in a standard format
• Objection: Opt out of certain data processing
• Withdraw Consent: Revoke previously given permissions

To exercise any of these rights, visit your dashboard settings or contact us at privacy@delistme.com.`
  },
  {
    id: "contact",
    title: "Contact Us",
    tldr: "Questions? Email privacy@delistme.com.",
    content: `For privacy-related inquiries:

Email: privacy@delistme.com
Response Time: Within 48 hours

For general support, please visit our Help Center or Contact page.

This policy was last updated on January 1, 2026.`
  }
]

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-muted-foreground">
              Last updated: January 1, 2026
            </p>
          </div>

          <div className="flex flex-col gap-12 md:flex-row">
            {/* Sidebar Navigation */}
            <nav className="shrink-0 md:sticky md:top-24 md:h-fit md:w-48">
              <ul className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:gap-1 md:pb-0">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {sections.map((section) => (
                <section
                  key={section.id}
                  className={activeSection === section.id ? "block" : "hidden"}
                >
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  
                  {/* TL;DR Box */}
                  <div className="mt-4 rounded-2xl bg-primary/5 p-4">
                    <p className="text-sm">
                      <span className="font-semibold text-primary">TL;DR:</span>{" "}
                      <span className="text-foreground">{section.tldr}</span>
                    </p>
                  </div>

                  {/* Full Content */}
                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 border-t border-border/40 pt-8 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
            <span className="text-border">|</span>
            <Link href="/contact" className="hover:text-foreground">
              Contact Us
            </Link>
            <span className="text-border">|</span>
            <Link href="/help" className="hover:text-foreground">
              Help Center
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
