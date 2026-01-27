"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { FloatingChat } from "@/components/floating-chat"
import { cn } from "@/lib/utils"

export function ChatWidget() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Hide explicitly on dashboard or auth pages if needed
    if (pathname.startsWith("/dashboard")) {
      setIsVisible(false)
      return
    }

    // Logic for Homepage
    if (pathname === "/") {
      const handleScroll = () => {
        // Show button after scrolling past hero section (approx 600px)
        const heroHeight = 600
        const shouldShow = window.scrollY > heroHeight
        setIsVisible(shouldShow)
      }

      // Initial check
      handleScroll()

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      // Show immediately on other public pages
      setIsVisible(true)
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500",
      "print:hidden"
    )}>
      <FloatingChat />
    </div>
  )
}
