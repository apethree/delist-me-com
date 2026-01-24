"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/verify") || pathname.startsWith("/authorize")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo - Larger and bolder */}
        <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <span className="text-lg font-bold text-background">D</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            DelistMe
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isAuthPage && (
          <nav className="hidden items-center gap-2 md:flex">
            <Link 
              href="/pricing" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link 
              href="/help" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Help
            </Link>
            <div className="ml-2 flex items-center gap-2">
              <Button 
                asChild 
                variant="ghost" 
                size="sm" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button 
                asChild 
                size="sm" 
                className="rounded-full bg-foreground px-5 text-sm font-semibold text-background shadow-lg shadow-foreground/10 transition-all hover:bg-foreground/90 hover:shadow-xl"
              >
                <Link href="/">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {!isAuthPage && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isAuthPage && (
        <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link 
              href="/pricing" 
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/help" 
              className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help
            </Link>
            <div className="mt-2 flex flex-col gap-2 border-t border-border/50 pt-4">
              <Button 
                asChild 
                variant="outline" 
                className="w-full justify-center"
              >
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button 
                asChild 
                className="w-full justify-center bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
