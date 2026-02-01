import React from "react"
import type { Metadata } from "next"
import { MobileBackButton } from "@/components/mobile-back-button"
import { ContactForm } from "@/components/contact-form"

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Contact Us | DelistMe",
  description: "Get in touch with DelistMe support. We are here to help with your privacy and data removal needs.",
  openGraph: {
    title: "Contact Us | DelistMe",
    description: "Get in touch with DelistMe support. We are here to help with your privacy and data removal needs.",
  }
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileBackButton />
      
      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-muted-foreground">
              Have a question? We&apos;re here to help.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  )
}
