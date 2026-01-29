"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function MobileBackButton() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on mobile
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isVisible) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full shadow-lg border-2",
        "bg-background/80 backdrop-blur-sm hover:bg-background",
        "transition-all duration-300 animate-in slide-in-from-left-4 fade-in duration-500"
      )}
      onClick={() => router.back()}
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  )
}
