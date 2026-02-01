"use client"

import * as React from "react"
import { cn } from "@delistme/ui"
import { User, Sparkles } from "lucide-react"

interface MessageProps {
  from: "user" | "assistant"
  children: React.ReactNode
  className?: string
}

export function Message({ from, children, className }: MessageProps) {
  return (
    <div className={cn(
      "flex w-full gap-3",
      from === "user" ? "flex-row-reverse" : "flex-row",
      className
    )}>
      {/* Avatar */}
      <div className={cn(
        "h-7 w-7 shrink-0 rounded-full flex items-center justify-center",
        from === "user" 
          ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" 
          : "bg-black text-white dark:bg-white dark:text-black"
      )}>
        {from === "user" ? <User size={12} /> : <Sparkles size={12} />}
      </div>
      
      {/* Content */}
      <div className={cn(
        "flex flex-col max-w-[85%]",
        from === "user" ? "items-end" : "items-start"
      )}>
        {children}
      </div>
    </div>
  )
}

interface MessageContentProps {
  children: React.ReactNode
  className?: string
}

export function MessageContent({ children, className }: MessageContentProps) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      {children}
    </div>
  )
}

interface MessageResponseProps {
  children: React.ReactNode
  className?: string
  from?: "user" | "assistant"
}

export function MessageResponse({ children, className, from = "assistant" }: MessageResponseProps) {
  return (
    <div className={cn(
      "px-3 py-2 rounded-xl",
      from === "user" 
        ? "bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900" 
        : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
      className
    )}>
      {children}
    </div>
  )
}

// Branch selector for multiple versions (simplified)
export function MessageBranch({ 
  children, 
  defaultBranch = 0 
}: { 
  children: React.ReactNode
  defaultBranch?: number 
}) {
  const [currentBranch, setCurrentBranch] = React.useState(defaultBranch)
  
  return (
    <MessageBranchContext.Provider value={{ currentBranch, setCurrentBranch }}>
      {children}
    </MessageBranchContext.Provider>
  )
}

interface MessageBranchContextType {
  currentBranch: number
  setCurrentBranch: (branch: number) => void
}

const MessageBranchContext = React.createContext<MessageBranchContextType | null>(null)

export function MessageBranchContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(MessageBranchContext)
  const childArray = React.Children.toArray(children)
  
  return <>{childArray[context?.currentBranch ?? 0]}</>
}

export function MessageBranchSelector({ from, children }: { from: "user" | "assistant", children: React.ReactNode }) {
  return (
    <div className={cn(
      "flex items-center gap-1 mt-1",
      from === "user" ? "justify-end" : "justify-start"
    )}>
      {children}
    </div>
  )
}

export function MessageBranchPrevious() {
  const context = React.useContext(MessageBranchContext)
  return (
    <button 
      onClick={() => context?.setCurrentBranch(Math.max(0, (context.currentBranch || 0) - 1))}
      className="text-xs text-slate-400 hover:text-slate-600"
    >
      ←
    </button>
  )
}

export function MessageBranchPage() {
  const context = React.useContext(MessageBranchContext)
  return <span className="text-xs text-slate-400">{(context?.currentBranch ?? 0) + 1}</span>
}

export function MessageBranchNext() {
  const context = React.useContext(MessageBranchContext)
  return (
    <button 
      onClick={() => context?.setCurrentBranch((context.currentBranch || 0) + 1)}
      className="text-xs text-slate-400 hover:text-slate-600"
    >
      →
    </button>
  )
}
