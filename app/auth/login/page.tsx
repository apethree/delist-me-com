"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Phone, Loader2 } from "lucide-react"

// Comprehensive country codes
const COUNTRY_CODES = [
  // North America
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  // Europe
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  // Asia Pacific
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  // Middle East
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  // Latin America
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  // Africa
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
]

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const verifyMode = searchParams.get("verify") === "true"
  const phoneParam = searchParams.get("phone") || ""
  const emailParam = searchParams.get("email") || ""
  
  // Default to phone
  const [mode, setMode] = useState<"phone" | "email">("phone")
  const [phone, setPhone] = useState(phoneParam)
  const [countryCode, setCountryCode] = useState("+1")
  const [email, setEmail] = useState(emailParam)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Determine verify mode type from URL params
  useEffect(() => {
    if (verifyMode) {
      if (emailParam) setMode("email")
      if (phoneParam) setMode("phone")
    }
  }, [verifyMode, emailParam, phoneParam])

  const formatPhone = (digits: string) => {
    if (digits.length !== 10) return digits
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (mode === "phone") {
        // Phone numbers can vary in length globally, just check for some digits
        if (phone.length < 4) {
          throw new Error("Please enter a valid phone number")
        }

        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: countryCode + phone }),
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || "Failed to send verification code")
        }

        // Pass full international phone in URL for verify step
        const fullPhone = countryCode + phone
        router.push(`/auth/login?verify=true&phone=${encodeURIComponent(fullPhone)}`)
      } else {
        // Email magic link
        if (!email || !email.includes("@")) {
          throw new Error("Please enter a valid email address")
        }

        const supabase = createClient()
        const { error: authError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            // Magic link redirects to /auth/callback which handles code exchange
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        })

        if (authError) throw authError

        router.push(`/auth/login?verify=true&email=${encodeURIComponent(email)}`)
      }

      setResendCooldown(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (otp.length !== 6) {
      setError("Please enter the 6-digit code")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneParam, otp }), // phoneParam is already full international format
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setResendCooldown(60)

    try {
      if (mode === "phone" && phoneParam) {
        // phoneParam is already full international format from URL
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phoneParam }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to resend code")
        }
      } else if (mode === "email" && emailParam) {
        const supabase = createClient()
        const { error: authError } = await supabase.auth.signInWithOtp({
          email: emailParam,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        })
        if (authError) throw authError
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code")
    }
  }

  const handleOAuthLogin = async (provider: "google" | "apple") => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  // Email verification screen (check email)
  if (verifyMode && emailParam) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => router.push("/auth/login")}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Check your email</CardTitle>
                <CardDescription>
                  We sent a magic link to <strong>{emailParam}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Click the link in the email to sign in. The link will expire in 1 hour.
                </p>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      resendCooldown > 0
                        ? "text-muted-foreground"
                        : "text-primary hover:text-primary/80"
                    )}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend email"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Phone OTP verification screen
  if (verifyMode && phoneParam) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => router.push("/auth/login")}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Enter verification code</CardTitle>
                <CardDescription>
                  We sent a code to {formatPhone(phoneParam)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyOtp}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="123456"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                          setOtp(value)
                        }}
                        className="text-center text-2xl tracking-widest"
                      />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <p className="text-muted-foreground">Didn&apos;t receive the code?</p>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0}
                      className={cn(
                        "mt-1 text-sm font-medium transition-colors",
                        resendCooldown > 0
                          ? "text-muted-foreground"
                          : "text-primary hover:text-primary/80"
                      )}
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Main login form
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Sign in or create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={mode === "phone" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMode("phone")}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Phone
                </Button>
                <Button
                  type="button"
                  variant={mode === "email" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMode("email")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>

              <form onSubmit={handleSendOtp}>
                <div className="flex flex-col gap-6">
                  {mode === "phone" ? (
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-28"
                        >
                          {COUNTRY_CODES.map((country, idx) => (
                            <option key={`${country.code}-${idx}`} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Phone number"
                          required
                          value={phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            setPhone(value)
                          }}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        We&apos;ll send you a verification code via SMS
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        We&apos;ll send you a magic link to sign in
                      </p>
                    </div>
                  )}

                  {error && <p className="text-sm text-red-500">{error}</p>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : mode === "phone" ? (
                      "Send verification code"
                    ) : (
                      "Send magic link"
                    )}
                  </Button>
                </div>
              </form>

              {/* OAuth Buttons - Only show for email mode */}
              {mode === "email" && (
                <>
                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleOAuthLogin("google")}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleOAuthLogin("apple")}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                      Continue with Apple
                    </Button>
                  </div>
                </>
              )}

              <p className="mt-6 text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <a href="/terms" className="underline underline-offset-4 hover:text-foreground">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy Policy
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
