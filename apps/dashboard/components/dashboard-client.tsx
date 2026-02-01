"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Shield,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  User,
  ExternalLink
} from "lucide-react"
import { Button } from "@delistme/ui"
import { Progress } from "@delistme/ui"
import { Badge } from "@delistme/ui"
import { cn } from "@delistme/ui"
import Link from "next/link"

// --- Types ---

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
  found: { label: "Exposed", color: "text-red-600", bgColor: "bg-red-500/10", icon: AlertCircle },
  pending: { label: "Pending", color: "text-orange-600", bgColor: "bg-orange-500/10", icon: Clock },
  submitted: { label: "In Progress", color: "text-blue-600", bgColor: "bg-blue-500/10", icon: RefreshCw },
  removed: { label: "Removed", color: "text-emerald-600", bgColor: "bg-emerald-500/10", icon: CheckCircle2 },
  not_found: { label: "Clean", color: "text-emerald-600", bgColor: "bg-emerald-500/10", icon: CheckCircle2 },
}

// --- Mock Data for Empty State ---
const MOCK_REQUESTS: RemovalRequest[] = [
  { id: '1', status: 'scanning', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db1', name: 'Whitepages', domain: 'whitepages.com', category: 'People Search', risk_level: 'High' } },
  { id: '2', status: 'found', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db2', name: 'Spokeo', domain: 'spokeo.com', category: 'People Search', risk_level: 'High' } },
  { id: '3', status: 'found', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db3', name: 'BeenVerified', domain: 'beenverified.com', category: 'Background Check', risk_level: 'High' } },
  { id: '4', status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db4', name: 'Radaris', domain: 'radaris.com', category: 'People Search', risk_level: 'Medium' } },
  { id: '5', status: 'removed', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db5', name: 'Intelius', domain: 'intelius.com', category: 'Background Check', risk_level: 'High' } },
  { id: '6', status: 'scanning', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db6', name: 'PeopleFinder', domain: 'peoplefinder.com', category: 'People Search', risk_level: 'Medium' } },
  { id: '7', status: 'found', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db7', name: 'TruthFinder', domain: 'truthfinder.com', category: 'Background Check', risk_level: 'High' } },
  { id: '8', status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db8', name: 'InstantCheckmate', domain: 'instantcheckmate.com', category: 'Background Check', risk_level: 'Medium' } },
  { id: '9', status: 'submitted', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db9', name: 'USSearch', domain: 'ussearch.com', category: 'People Search', risk_level: 'Low' } },
  { id: '10', status: 'not_found', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data_brokers: { id: 'db10', name: 'ZabaSearch', domain: 'zabasearch.com', category: 'People Search', risk_level: 'Medium' } },
];

// --- Main Component ---

export function DashboardClient({ profile, requests }: DashboardClientProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'brokers' | 'settings'>('dashboard')
  const [isSimulating, setIsSimulating] = useState(false)

  // Use mock data if no real requests exist (for demo purposes)
  const displayRequests = requests.length > 0 ? requests : MOCK_REQUESTS;

  // Calculate stats
  const totalBrokers = displayRequests.length
  const scanned = displayRequests.filter((r) => r.status !== "scanning").length
  const exposed = displayRequests.filter((r) => ["found", "pending", "submitted"].includes(r.status)).length
  const removed = displayRequests.filter((r) => ["removed", "not_found"].includes(r.status)).length
  const scanProgress = totalBrokers > 0 ? Math.round((scanned / totalBrokers) * 100) : 0

  // Simulate scan progress for demo visuals if needed
  useEffect(() => {
    const scanningRequests = displayRequests.filter((r) => r.status === "scanning")
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

  const NavItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id)
        setIsSidebarOpen(false)
      }}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        activeTab === id 
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 lg:static",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
               <span className="font-bold">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight">DelistMe</span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            <NavItem id="dashboard" icon={LayoutDashboard} label="Overview" />
            <NavItem id="brokers" icon={Shield} label="Data Brokers" />
            <NavItem id="settings" icon={Settings} label="Settings" />
          </nav>

          {/* User Profile */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{profile.phone || "User"}</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive" 
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-600">Active</span>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Privacy Overview
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time monitoring of your personal data exposure.
              </p>
            </div>
            <div className="flex gap-3">
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run New Scan
              </Button>
            </div>
          </div>

          {/* Scan Progress */}
          {scanProgress < 100 && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">System Scan in Progress</h3>
                  <p className="text-sm text-muted-foreground">Identifying data brokers holding your info...</p>
                </div>
                <span className="text-2xl font-bold text-primary">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Exposed</p>
                  <h3 className="text-2xl font-bold">{exposed}</h3>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Removal</p>
                  <h3 className="text-2xl font-bold">{exposed}</h3> 
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Protected</p>
                  <h3 className="text-2xl font-bold">{removed}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity / Brokers List */}
          <div className="rounded-2xl border border-border bg-card shadow-sm">
             <div className="border-b border-border px-6 py-4 flex items-center justify-between">
               <h3 className="font-semibold">Recent Data Broker Activity</h3>
               <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                 View All
               </Button>
             </div>
             
             <div className="divide-y divide-border">
               {displayRequests.slice(0, 5).map((request) => {
                 const config = statusConfig[request.status] || statusConfig.pending
                 const StatusIcon = config.icon

                 return (
                   <div key={request.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", config.bgColor)}>
                         <StatusIcon className={cn("h-5 w-5", config.color)} />
                       </div>
                       <div>
                         <p className="font-medium text-foreground">{request.data_brokers.name}</p>
                         <p className="text-sm text-muted-foreground">{request.data_brokers.domain}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <Badge variant="secondary" className={cn("font-normal", config.bgColor, config.color)}>
                         {config.label}
                       </Badge>
                       <ChevronRight className="h-4 w-4 text-muted-foreground" />
                     </div>
                   </div>
                 )
               })}
               
               {displayRequests.length === 0 && (
                 <div className="p-8 text-center text-muted-foreground">
                   No activity found yet. Run a scan to get started.
                 </div>
               )}
             </div>
          </div>

        </div>
      </main>
    </div>
  )
}
