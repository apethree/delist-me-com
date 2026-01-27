"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConversationProps {
  children: React.ReactNode
  className?: string
}

export function Conversation({ children, className }: ConversationProps) {
  return (
    <div className={cn("relative flex-1 flex flex-col overflow-hidden", className)}>
      {children}
    </div>
  )
}

interface ConversationContentProps {
  children: React.ReactNode
  className?: string
}

export function ConversationContent({ children, className }: ConversationContentProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  
  return (
    <ConversationScrollContext.Provider value={{ scrollRef }}>
      <div 
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          className
        )}
      >
        <div className="space-y-4 py-4 px-4">
          {children}
        </div>
      </div>
    </ConversationScrollContext.Provider>
  )
}

// Scroll context for the scroll button
interface ConversationScrollContextType {
  scrollRef: React.RefObject<HTMLDivElement | null>
}

const ConversationScrollContext = React.createContext<ConversationScrollContextType | null>(null)

export function ConversationScrollButton({ className }: { className?: string }) {
  const context = React.useContext(ConversationScrollContext)
  const [showButton, setShowButton] = React.useState(false)
  
  React.useEffect(() => {
    const scrollEl = context?.scrollRef.current
    if (!scrollEl) return
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      setShowButton(scrollHeight - scrollTop - clientHeight > 100)
    }
    
    scrollEl.addEventListener('scroll', handleScroll)
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [context])
  
  const scrollToBottom = () => {
    context?.scrollRef.current?.scrollTo({
      top: context.scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }

  if (!showButton) return null

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={scrollToBottom}
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full shadow-lg",
        className
      )}
    >
      <ChevronDown size={16} />
    </Button>
  )
}
