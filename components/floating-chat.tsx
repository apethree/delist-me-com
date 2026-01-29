"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Sparkles, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Reusing the same simulated response logic for consistency
const PREDEFINED_RESPONSES: Record<string, string> = {
  "How do I protect my phone number?": "Protecting your phone number is a two-step process: First, we remove your personal information from 50+ data broker sites. Second, we provide call filtering that blocks 99.8% of spam calls. Start a free scan on our homepage!",
  "What data brokers have my info?": "Data brokers like Whitepages, Spokeo, and PeopleFinders collect and sell your info. We can scan these sites for you for free - just enter your number on our homepage.",
  "Can I get a virtual phone number?": "Yes! Our virtual phone number feature is included in all paid plans. It keeps your real number private for shopping and sign-ups.",
  "Is there a free trial?": "Absolutely! We offer a completely free scan of 50+ data broker sites. You can also try our spam call blocking for 7 days free.",
  "How quickly does it work?": "Our AI scans sites in under 60 seconds. Removal requests are sent immediately, and most data brokers remove info within 7-14 days."
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "👋 Hi! Need help stopping spam calls? Ask me anything!"
  }
]

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const simulateResponse = (question: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const response = PREDEFINED_RESPONSES[question] || 
        "I can help with that! Please start a free scan on our homepage for personalized details, or ask another question."
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    
    simulateResponse(input.trim())
    setInput("")
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="h-14 w-14 rounded-lg shadow-2xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[350px] p-0 mr-4 mb-4 bg-transparent border-none shadow-none" 
        side="top" 
        align="end"
        sideOffset={16}
      >
        <div className="flex flex-col w-full h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">DelistMe AI</h3>
                <p className="text-[10px] text-blue-100">Online • Replies instantly</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Area */}
          <div className="h-[350px] overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex w-full animate-in fade-in slide-in-from-bottom-1 duration-200",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 max-w-[85%] text-sm shadow-sm",
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
               <div className="flex justify-start">
                 <div className="rounded-2xl bg-white dark:bg-slate-800 px-3 py-2 rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                   <div className="flex items-center gap-1">
                     <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                     <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                     <div className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 text-sm bg-slate-100 dark:bg-slate-900 border-0 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 focus:outline-none placeholder:text-slate-400 transition-all"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className={cn(
                  "h-9 w-9 shrink-0 transition-all",
                  input.trim() ? "bg-blue-600 text-white shadow-md" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
                disabled={!input.trim() || isTyping}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
