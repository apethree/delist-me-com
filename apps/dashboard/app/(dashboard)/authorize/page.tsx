"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Lock, ArrowRight, Scan, FileX, Eye } from "lucide-react"
import { Button } from "@delistme/ui"
import { Checkbox } from "@delistme/ui"
import { Label } from "@delistme/ui"
import Link from "next/link"

const consentItems = [
  {
    id: "scan",
    icon: Scan,
    title: "Scan Data Brokers",
    description: "Search for your information across 50+ data broker sites",
    required: true,
  },
  {
    id: "removal",
    icon: FileX,
    title: "Submit Removal Requests",
    description: "Authorize us to submit opt-out requests on your behalf",
    required: true,
  },
  {
    id: "monitor",
    icon: Eye,
    title: "Continuous Monitoring",
    description: "Enable ongoing scans to catch new listings as they appear",
    required: false,
  },
]

export default function AuthorizePage() {
  const router = useRouter()
  const [consents, setConsents] = useState<Record<string, boolean>>({
    scan: false,
    removal: false,
    monitor: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const allRequiredChecked = consentItems
    .filter((item) => item.required)
    .every((item) => consents[item.id])

  const handleToggle = (id: string) => {
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleContinue = async () => {
    if (!allRequiredChecked) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consents }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save preferences")
      }

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress Indicator */}
      <div className="border-b border-border/40 px-6 py-4">
        <div className="mx-auto flex max-w-md items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-medium text-foreground">Phone</span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-medium text-foreground">Verify</span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              3
            </div>
            <span className="text-sm font-medium text-foreground">Authorize</span>
          </div>
        </div>
      </div>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Authorize DelistMe
            </h1>
            <p className="mt-2 text-muted-foreground">
              Review the actions we&apos;ll take to protect your privacy
            </p>
          </div>

          <div className="space-y-3">
            {consentItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${
                    consents[item.id]
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/60 bg-muted/20 hover:border-border"
                  }`}
                >
                  <Checkbox
                    id={item.id}
                    checked={consents[item.id]}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={item.id}
                      className="flex cursor-pointer items-center gap-2 font-medium text-foreground"
                    >
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      {item.title}
                      {item.required && (
                        <span className="text-xs font-normal text-muted-foreground">Required</span>
                      )}
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-destructive">{error}</p>
          )}

          <Button
            onClick={handleContinue}
            disabled={!allRequiredChecked || isLoading}
            className="mt-6 h-14 w-full rounded-2xl bg-primary text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Start Privacy Scan
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-muted/30 p-4">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              Your consent can be revoked at any time.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
