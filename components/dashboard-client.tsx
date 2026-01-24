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
  Home,
  Settings,
  Bell,
  ChevronRight,
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
  scanning: { label: "Scanning", color: "text-blue-600", bgColor: "bg-blue-500/10", icon: Search },
  found: { label: "Found", color: "text-orange-600", bgColor: "bg-orange-500/10", icon: AlertCircle },
  pending: { label: "Pending", color: "text-muted-foreground", bgColor: "bg-muted", icon: Clock },
  submitted: { label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-500/10", icon: RefreshCw },
  removed: { label: "Removed", color: "text-green-600", bgColor: "bg-green-500/10", icon: CheckCircle2 },
  not_found: { label: "Clear", color: "text-green-600", bgColor: "bg-green-500/10", icon: CheckCircle2 },
}

export function DashboardClient({ profile, requests }: DashboardClientProps) {
  const router = useRouter()
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeTab, setActiveTab] = useState<'home' | 'alerts' | 'settings'>('home')

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
      {/* Mobile Header - App Style */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
              <Shield className="h-5 w-5 text-background" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">DelistMe</h1>
              <p className="text-xs text-muted-foreground">Privacy Dashboard</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut} className="h-10 w-10 rounded-xl">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Protection Score Card */}
        <div className="border-b border-border bg-gradient-to-b from-green-500/10 to-transparent px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-lg text-center">
            <div className="relative mx-auto mb-4 h-32 w-32">
              <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(removed / (totalBrokers || 1)) * 283} 283`}
                  strokeLinecap="round"
                  className="text-green-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{removed}</span>
                <span className="text-xs text-muted-foreground">Removed</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {removed > 0 ? "You're protected!" : "Scan in progress..."}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitoring {totalBrokers} data broker sites
            </p>
          </div>
        </div>

        {/* Scan Progress (if active) */}
        {scanProgress < 100 && (
          <div className="border-b border-border px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-lg">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Scanning...</span>
                <span className="text-sm text-muted-foreground">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="border-b border-border px-4 py-6 sm:px-6">
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-3">
            <div className="rounded-xl bg-muted/50 p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{scanned}</p>
              <p className="mt-1 text-xs text-muted-foreground">Scanned</p>
            </div>
            <div className="rounded-xl bg-orange-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">{found}</p>
              <p className="mt-1 text-xs text-muted-foreground">Found</p>
            </div>
            <div className="rounded-xl bg-green-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{removed}</p>
              <p className="mt-1 text-xs text-muted-foreground">Removed</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{pending}</p>
              <p className="mt-1 text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>

        {/* Data Brokers List */}
        <div className="px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-lg">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Data Broker Status
            </h3>
            <div className="space-y-2">
              {requests.map((request) => {
                const config = statusConfig[request.status] || statusConfig.pending
                const StatusIcon = config.icon
                const broker = request.data_brokers

                return (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-xl bg-muted/30 p-4 transition-colors active:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
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
                        <p className="text-sm text-muted-foreground">{broker.domain}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-normal",
                          request.status === "removed" && "bg-green-500/10 text-green-600",
                          request.status === "found" && "bg-orange-500/10 text-orange-600"
                        )}
                      >
                        {config.label}
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation - App Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl safe-area-inset-bottom">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-2 transition-colors",
              activeTab === 'home' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-2 transition-colors",
              activeTab === 'alerts' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <Bell className="h-5 w-5" />
            <span className="text-xs font-medium">Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-2 transition-colors",
              activeTab === 'settings' ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
