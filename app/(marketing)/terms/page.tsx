"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    tldr: "By using DelistMe, you agree to these terms.",
    content: `By accessing or using DelistMe's services, you agree to be bound by these Terms of Service and our Privacy Policy.

If you do not agree to these terms, please do not use our services. We may update these terms from time to time, and your continued use constitutes acceptance of any changes.`
  },
  {
    id: "services",
    title: "Our Services",
    tldr: "We scan data brokers and submit removal requests on your behalf.",
    content: `DelistMe provides the following services:

• Privacy Scanning: We search data broker websites to identify where your personal information appears.
• Automated Removal: We submit opt-out requests to data brokers on your behalf.
• Continuous Monitoring: We periodically re-scan to ensure your data stays removed.
• Status Reporting: We provide dashboards and notifications about your privacy status.

Our services are designed to reduce your digital footprint but cannot guarantee complete removal from all sources, as data broker compliance varies.`
  },
  {
    id: "eligibility",
    title: "Eligibility",
    tldr: "You must be 18+ and provide accurate information.",
    content: `To use DelistMe, you must:

• Be at least 18 years old
• Provide accurate and complete information about yourself
• Only request removal of your own personal information
• Not use the service for any unlawful purpose
• Maintain the security of your account credentials

You may not use DelistMe to remove information about other people without their explicit consent and authorization.`
  },
  {
    id: "authorization",
    title: "Authorization",
    tldr: "You authorize us to act on your behalf with data brokers.",
    content: `By using our services, you grant DelistMe:

• Limited Power of Attorney: Authority to act as your authorized agent for submitting data removal requests to data brokers.
• Information Access: Permission to access and use your personal information solely for removal purposes.
• Communication Rights: Permission to communicate with data brokers on your behalf.

This authorization can be revoked at any time by closing your account, though pending removal requests may still be processed.`
  },
  {
    id: "limitations",
    title: "Service Limitations",
    tldr: "We can't guarantee 100% removal as data broker compliance varies.",
    content: `While we strive for complete data removal, please understand:

• Data brokers have varying response times (24 hours to 45 days)
• Some brokers may not honor removal requests
• Your information may reappear if re-shared by other sources
• We cannot remove data from all possible online sources
• Results may vary based on the uniqueness of your personal information

We provide our services on a "best efforts" basis and continually work to improve our removal success rates.`
  },
  {
    id: "fees",
    title: "Fees & Billing",
    tldr: "Free scan, paid subscription for ongoing monitoring. Cancel anytime.",
    content: `Pricing structure:

• Free Tier: Initial privacy scan at no cost
• Premium Subscription: Monthly or annual plans for automated removal and monitoring

For paid subscriptions:
• Charges are processed through secure payment providers
• Subscriptions auto-renew unless cancelled
• Cancel anytime with no penalties
• Refunds may be available within 30 days per our refund policy

Prices may change with 30 days notice to existing subscribers.`
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    tldr: "Our technology and branding belong to us. Your data belongs to you.",
    content: `Ownership rights:

DelistMe Owns:
• All software, algorithms, and technology
• Trademarks, logos, and branding
• Website design and content
• Aggregated, anonymized analytics

You Own:
• All your personal information
• The right to delete your data at any time
• Results of your privacy scans

You may not copy, modify, distribute, or reverse engineer any part of our services without written permission.`
  },
  {
    id: "termination",
    title: "Termination",
    tldr: "You can close your account anytime. We can terminate for violations.",
    content: `Account termination:

You May Terminate:
• Close your account at any time from dashboard settings
• Request complete data deletion
• No penalty or fees for cancellation

We May Terminate:
• If you violate these terms
• If you provide false information
• If you misuse our services
• If required by law

Upon termination, we will delete your data according to our Privacy Policy.`
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    tldr: "Our liability is limited to the fees you've paid us.",
    content: `To the maximum extent permitted by law:

• DelistMe is provided "as is" without warranties of any kind
• We are not liable for indirect, incidental, or consequential damages
• Our total liability is limited to fees paid in the 12 months prior to any claim
• We are not responsible for actions or inactions of third-party data brokers

This limitation applies to all claims, whether based on contract, tort, or any other legal theory.`
  },
  {
    id: "contact",
    title: "Contact",
    tldr: "Legal questions? Email legal@delistme.com.",
    content: `For legal inquiries:

Email: legal@delistme.com
Response Time: Within 5 business days

For general support, please visit our Help Center or Contact page.

These terms were last updated on January 1, 2026.`
  }
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      
      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Terms of Service
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
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
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
