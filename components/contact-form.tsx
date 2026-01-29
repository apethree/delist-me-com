"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-muted/30 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Message Sent</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          required
          className="h-12 rounded-xl border-border/60 bg-muted/30"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="h-12 rounded-xl border-border/60 bg-muted/30"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry" className="text-sm font-medium text-foreground">
          Inquiry Type
        </Label>
        <Select name="inquiry" required>
          <SelectTrigger className="h-12 rounded-xl border-border/60 bg-muted/30">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Question</SelectItem>
            <SelectItem value="account">Account Support</SelectItem>
            <SelectItem value="removal">Removal Request</SelectItem>
            <SelectItem value="billing">Billing Inquiry</SelectItem>
            <SelectItem value="privacy">Privacy Concern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          className="min-h-32 rounded-xl border-border/60 bg-muted/30 resize-none"
          placeholder="How can we help?"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-xl bg-primary text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
      >
        {isLoading ? (
          "Sending..."
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
