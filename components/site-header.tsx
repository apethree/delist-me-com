"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/verify") || pathname.startsWith("/authorize")

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="transition-opacity hover:opacity-70">
          <span className="text-xl font-semibold tracking-tight text-foreground">DelistMe</span>
        </Link>

        {!isAuthPage && (
          <Button asChild size="sm" className="rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90">
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
