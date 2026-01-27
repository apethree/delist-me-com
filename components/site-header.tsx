import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  variant?: 'light' | 'dark'
}

export function SiteHeader({ variant = 'light' }: SiteHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full backdrop-blur-md",
      isDark 
        ? "bg-[#0A0A0A]/95 border-white/10 text-white shadow-lg ring-1 ring-white/5" 
        : "bg-white/95 border-black/5 text-black shadow-sm"
    )}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
        
        {/* Logo Section - Modern & Clean */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group" aria-label="DelistMe Home">
          <div className="flex flex-col">
            <h1 className={cn(
              "text-2xl md:text-3xl font-semibold tracking-tight leading-none",
              isDark ? "text-white drop-shadow-sm" : "text-black"
            )}>
              DelistMe
            </h1>
          </div>
        </Link>
        
        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold">
            <Link href="/#how-it-works" className={cn("transition-colors", isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black")}>How it works</Link>
            <Link href="/#pricing" className={cn("transition-colors", isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black")}>Pricing</Link>
            <Link href="/about" className={cn("transition-colors", isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black")}>About</Link>
          </nav>
          
          <div className={cn("h-6 w-px hidden md:block", isDark ? "bg-white/10" : "bg-black/10")} />

          {/* Desktop: Separate Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className={cn(
                "hidden md:inline-flex text-xs font-semibold h-9 px-4 transition-colors",
                isDark 
                  ? "text-white hover:text-white hover:bg-white/10" 
                  : "text-black hover:text-black hover:bg-black/5"
              )}>
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className={cn(
                "font-bold text-xs h-8 px-5 shadow-lg transition-all duration-300 hover:scale-[1.02] rounded-sm", // Sharper edges
                isDark 
                  ? "bg-white text-black hover:bg-gray-100 shadow-white/10" 
                  : "bg-black text-white hover:bg-gray-900 shadow-black/20"
              )}>
                Get Protected
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
