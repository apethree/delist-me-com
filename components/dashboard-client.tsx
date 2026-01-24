"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  LogOut,
  RefreshCw,
  Shield,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Profile {
  id: string
  phone: string | null
  consent_scan: boolean
  consent_removal: boolean
  consent_monitor: boolean
  onboarding_complete: boolean
}

interface DataBroker {
  id: string
  name: string
  domain: string
  category: string
  risk_level: string
}

interface RemovalRequest {
  id: string
  status: string
  created_at: string
  updated_at: string
  data_brokers: DataBroker
}

interface DashboardClientProps {
  profile: Profile
  requests: RemovalRequest[]
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
  scanning: { label: "Scanning", color: "text-primary", bgColor: "bg-primary/10", icon: Search },
  found: { label: "Found", color: "text-warning", bgColor: "bg-warning/10", icon: AlertCircle },
  pending: { label: "Pending", color: "text-muted-foreground", bgColor: "bg-muted", icon: Clock },
  submitted: { label: "Submitted", color: "text-primary", bgColor: "bg-primary/10", icon: RefreshCw },
  removed: { label: "Removed", color: "text-success", bgColor: "bg-success/10", icon: CheckCircle2 },
  not_found: { label: "Not Found", color: "text-muted-foreground", bgColor: "bg-muted", icon: CheckCircle2 },
}

export function DashboardClient({ profile, requests }: DashboardClientProps) {
  const router = useRouter()
  const [isSimulating, setIsSimulating] = useState(false)

  // Calculate stats
  const totalBrokers = requests.length
  const scanned = requests.filter((r) => r.status !== "scanning").length
  const found = requests.filter((r) => r.status === "found").length
  const removed = requests.filter((r) => r.status === "removed").length
  const pending = requests.filter((r) => ["pending", "submitted"].includes(r.status)).length
  const scanProgress = totalBrokers > 0 ? Math.round((scanned / totalBrokers) * 100) : 0

  // Simulate scan progress for demo
  useEffect(() => {
    const scanningRequests = requests.filter((r) => r.status === "scanning")
    if (scanningRequests.length > 0 && !isSimulating) {
      setIsSimulating(true)
      const timeout = setTimeout(() => {
        router.refresh()
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [requests, isSimulating, router])

  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" })
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <Shield className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-semibold tracking-tight text-foreground">DelistMe</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Privacy Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Monitoring {totalBrokers} data broker sites
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-12 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-muted/30 p-6 text-center">
              <p className="text-3xl font-semibold text-foreground">{scanned}</p>
              <p className="mt-1 text-sm text-muted-foreground">Scanned</p>
            </div>
            <div className="rounded-2xl bg-warning/10 p-6 text-center">
              <p className="text-3xl font-semibold text-warning">{found}</p>
              <p className="mt-1 text-sm text-muted-foreground">Found</p>
            </div>
            <div className="rounded-2xl bg-success/10 p-6 text-center">
              <p className="text-3xl font-semibold text-success">{removed}</p>
              <p className="mt-1 text-sm text-muted-foreground">Removed</p>
            </div>
            <div className="rounded-2xl bg-muted/30 p-6 text-center">
              <p className="text-3xl font-semibold text-foreground">{pending}</p>
              <p className="mt-1 text-sm text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* Scan Progress */}
          {scanProgress < 100 && (
            <div className="mb-12 rounded-3xl bg-muted/20 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Scan in Progress</h2>
                <span className="text-sm text-muted-foreground">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <p className="mt-3 text-sm text-muted-foreground">
                Scanning your information across data broker sites...
              </p>
            </div>
          )}

          {/* Data Brokers List */}
          <div>
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Data Broker Status
            </h2>
            <div className="space-y-2">
              {requests.map((request) => {
                const config = statusConfig[request.status] || statusConfig.pending
                const StatusIcon = config.icon
                const broker = request.data_brokers

                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-2xl bg-muted/20 p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          config.bgColor
                        )}
                      >
                        <StatusIcon
                          className={cn(
                            "h-5 w-5",
                            config.color,
                            request.status === "scanning" && "animate-pulse"
                          )}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{broker.name}</p>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          {broker.domain}
                          <ExternalLink className="h-3 w-3" />
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {broker.risk_level === "high" && (
                        <Badge variant="outline" className="border-destructive/50 text-destructive">
                          High Risk
                        </Badge>
                      )}
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-normal",
                          request.status === "removed" && "bg-success/10 text-success",
                          request.status === "found" && "bg-warning/10 text-warning"
                        )}
                      >
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 px-6 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/help" className="hover:text-foreground">Help</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
