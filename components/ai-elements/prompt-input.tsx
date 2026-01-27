"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUp, Paperclip, Plus } from "lucide-react"

// Context for managing attachments
interface AttachmentFile {
  id: string
  file: File
  preview?: string
}

interface PromptInputAttachmentsContextType {
  files: AttachmentFile[]
  add: (files: FileList) => void
  remove: (id: string) => void
  clear: () => void
}

const PromptInputAttachmentsContext = React.createContext<PromptInputAttachmentsContextType | null>(null)

export function usePromptInputAttachments() {
  const context = React.useContext(PromptInputAttachmentsContext)
  if (!context) {
    throw new Error("usePromptInputAttachments must be used within a PromptInput")
  }
  return context
}

// Types
export interface PromptInputMessage {
  text: string
  files?: AttachmentFile[]
}

interface PromptInputProps {
  children: React.ReactNode
  onSubmit?: (message: PromptInputMessage) => void
  globalDrop?: boolean
  multiple?: boolean
  className?: string
}

// Main PromptInput component
export function PromptInput({ 
  children, 
  onSubmit, 
  className 
}: PromptInputProps) {
  const [files, setFiles] = React.useState<AttachmentFile[]>([])
  const [text, setText] = React.useState("")
  
  const attachmentsContext: PromptInputAttachmentsContextType = {
    files,
    add: (fileList) => {
      const newFiles = Array.from(fileList).map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }))
      setFiles(prev => [...prev, ...newFiles])
    },
    remove: (id) => {
      setFiles(prev => prev.filter(f => f.id !== id))
    },
    clear: () => setFiles([])
  }

  const handleSubmit = () => {
    if (onSubmit && (text.trim() || files.length > 0)) {
      onSubmit({ text, files })
      setText("")
      attachmentsContext.clear()
    }
  }

  return (
    <PromptInputAttachmentsContext.Provider value={attachmentsContext}>
      <PromptInputTextContext.Provider value={{ text, setText, onSubmit: handleSubmit }}>
        <div className={cn(
          "relative bg-background rounded-xl border border-border",
          "shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring/20",
          "overflow-hidden",
          className
        )}>
          {children}
        </div>
      </PromptInputTextContext.Provider>
    </PromptInputAttachmentsContext.Provider>
  )
}

// Text Context
interface PromptInputTextContextType {
  text: string
  setText: (text: string) => void
  onSubmit: () => void
}

const PromptInputTextContext = React.createContext<PromptInputTextContextType | null>(null)

function usePromptInputText() {
  const context = React.useContext(PromptInputTextContext)
  if (!context) {
    throw new Error("usePromptInputText must be used within a PromptInput")
  }
  return context
}

// Sub-components
export function PromptInputHeader({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("px-4 pt-3", className)}>
      {children}
    </div>
  )
}

export function PromptInputBody({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}

export function PromptInputFooter({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-2 px-3 py-2.5", className)}>
      {children}
    </div>
  )
}

export function PromptInputTools({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {children}
    </div>
  )
}

interface PromptInputTextareaProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
}

export function PromptInputTextarea({ 
  value, 
  onChange, 
  placeholder = "Ask anything...",
  className 
}: PromptInputTextareaProps) {
  const { text, setText, onSubmit } = usePromptInputText()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  
  const currentValue = value !== undefined ? value : text
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e)
    } else {
      setText(e.target.value)
    }
    
    // Auto-resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={currentValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={cn(
        "w-full bg-transparent border-0 py-3 px-4 text-foreground",
        "placeholder:text-muted-foreground focus:ring-0 resize-none min-h-[56px] max-h-[200px] outline-none text-sm",
        className
      )}
      style={{ height: '56px' }}
    />
  )
}

interface PromptInputSubmitProps {
  disabled?: boolean
  status?: "submitted" | "streaming" | "ready" | "error"
  className?: string
}

export function PromptInputSubmit({ disabled, status, className }: PromptInputSubmitProps) {
  const { text, onSubmit } = usePromptInputText()
  const isDisabled = disabled || !text.trim() || status === "streaming"
  
  return (
    <Button
      size="icon"
      onClick={onSubmit}
      disabled={isDisabled}
      className={cn(
        "h-8 w-8 rounded-lg transition-all duration-200",
        text.trim() && !isDisabled
          ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          : "bg-muted text-muted-foreground hover:bg-muted",
        status === "streaming" && "animate-pulse",
        className
      )}
    >
      <ArrowUp size={16} strokeWidth={2.5} />
    </Button>
  )
}

export function PromptInputButton({ 
  children, 
  onClick, 
  variant = "ghost",
  className 
}: { 
  children: React.ReactNode
  onClick?: () => void
  variant?: "ghost" | "default"
  className?: string 
}) {
  return (
    <Button
      size="sm"
      variant={variant}
      onClick={onClick}
      className={cn("h-8 px-2 gap-1 text-xs", className)}
    >
      {children}
    </Button>
  )
}

// Action Menu
export function PromptInputActionMenu({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function PromptInputActionMenuTrigger() {
  return (
    <Button size="icon" variant="ghost" className="h-8 w-8">
      <Plus size={16} />
    </Button>
  )
}

export function PromptInputActionMenuContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function PromptInputActionAddAttachments() {
  const attachments = usePromptInputAttachments()
  const inputRef = React.useRef<HTMLInputElement>(null)
  
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            attachments.add(e.target.files)
          }
        }}
      />
      <Button
        size="sm"
        variant="ghost"
        onClick={() => inputRef.current?.click()}
        className="h-8 px-2 gap-1"
      >
        <Paperclip size={14} />
        <span>Attach</span>
      </Button>
    </>
  )
}
