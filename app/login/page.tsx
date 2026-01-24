"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/phone-input"
import { SiteHeader } from "@/components/site-header"

export default function LoginPage() {
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

      router.push(`/verify?phone=${encodeURIComponent(phone)}&login=true`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                disabled={isLoading}
                className="h-14 rounded-2xl border-border/60 bg-muted/30 px-4 text-center text-lg shadow-sm"
              />
              {error && (
                <p className="mt-3 text-center text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="h-14 w-full rounded-2xl bg-primary text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
              disabled={isLoading || phone.length !== 10}
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Lock className="mr-1 inline-block h-3 w-3" />
            Your data is encrypted and never shared.
          </p>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {"Don't have an account?"}{" "}
            <button
              onClick={() => router.push("/")}
              className="font-medium text-primary hover:text-primary/80"
            >
              Get Started
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
