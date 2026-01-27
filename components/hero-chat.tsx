"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import StatusIndicator from "@/components/ui/status-indicator";

// Predefined conversation and responses
const INITIAL_MESSAGES = [
  {
    id: "welcome-1",
    role: "assistant" as const,
    content: "👋 Hi! I'm DelistMe AI. I can help you understand how we protect your phone from spam and unwanted calls. Ask me anything!",
  }
]

// Map of user questions to AI responses
const PREDEFINED_RESPONSES: Record<string, string> = {
  "How do I protect my phone number?": "Protecting your phone number is a two-step process: First, we remove your personal information from 50+ data broker sites that sell your phone number to telemarketers. Second, we provide call filtering that blocks 99.8% of spam calls. You can also get a virtual phone number to use for sign-ups, keeping your real number private. Start a free scan above to see which sites have your data right now!",
  "What data brokers have my info?": "Great question! Data brokers like Whitepages, Spokeo, PeopleFinders, and 40+ others collect and sell your personal information including your phone number, address, and family details. Enter your phone number above for a FREE scan, and we'll show you exactly which sites have your data and how much they're selling it for.",
  "Can I get a virtual phone number?": "Yes! Our virtual phone number feature is included in all paid plans. You get a real phone number that you can use for shopping, sign-ups, and services. All calls and texts go to the app instead of your real phone, keeping your personal number spam-free. You can check messages anytime in the app, and even reply if needed.",
  "Is there a free trial?": "Absolutely! We offer a completely free scan of 50+ data broker sites - no credit card required. You'll see exactly which sites have your information and what they're selling. You can also try our spam call blocking for 7 days free. After that, premium plans start at just $14.99/month with unlimited removals and virtual phone numbers.",
  "How quickly does it work?": "Very fast! Most users see results within 24-48 hours. Here's the timeline: Our AI scans 50+ sites in under 60 seconds, removal requests are sent immediately, and most data brokers remove your info within 7-14 days. Spam call blocking starts working the moment you activate it. Premium users report a 90%+ reduction in spam within the first week!"
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isInputDisabled, setIsInputDisabled] = useState(true) // Disable input during intro sequence
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Typewriter State
  const [displayedText, setDisplayedText] = useState("")
  const [currentTypingRole, setCurrentTypingRole] = useState<"user" | "assistant" | null>(null)
  
  // Sequence State
  const [sequenceStep, setSequenceStep] = useState(0)

  // Defines the automated intro sequence
  // delayAfter: how long to wait AFTER this message finishes typing before starting the next one
  const introSequence = [
    {
      role: "assistant" as const,
      content: "👋 Hi! I'm DelistMe AI. I can help you understand how we protect your phone from spam and unwanted calls. Ask me anything!",
      delayAfter: 1500
    },
    {
      role: "user" as const,
      content: "How do I protect my phone number?",
      delayAfter: 1000
    },
    {
      role: "assistant" as const,
      content: PREDEFINED_RESPONSES["How do I protect my phone number?"],
      delayAfter: 2000
    },
    {
      role: "user" as const,
      content: "Is there a free trial?",
      delayAfter: 1000
    },
    {
      role: "assistant" as const,
      content: PREDEFINED_RESPONSES["Is there a free trial?"],
      delayAfter: 0 // End of sequence
    }
  ]

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
        // Use scrollTop assignment which works with scroll-smooth CSS class
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Master Sequence Controller
  useEffect(() => {
    if (sequenceStep >= introSequence.length) {
      setIsInputDisabled(false) // Enable input when sequence is done
      setCurrentTypingRole(null)
      return
    }

    const currentItem = introSequence[sequenceStep]
    setCurrentTypingRole(currentItem.role)
    
    let charIndex = 0
    let typingInterval: NodeJS.Timeout

    // Start typing
    typingInterval = setInterval(() => {
      charIndex++
      setDisplayedText(currentItem.content.slice(0, charIndex))

      if (charIndex >= currentItem.content.length) {
        clearInterval(typingInterval)
        
        // Typing finished for this step
        // 1. Commit the full message to the list
        // 2. Clear displayed text
        // 3. Wait 'delayAfter' time
        // 4. Increment sequenceStep
        
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: `intro-${sequenceStep}`,
                role: currentItem.role,
                content: currentItem.content
            }])
            setDisplayedText("")
            setCurrentTypingRole(null) // Hide typing indicator/bubble temporarily

            setTimeout(() => {
                setSequenceStep(prev => prev + 1)
            }, currentItem.delayAfter)

        }, 400) // Small pause just after finishing typing before "committing" it to the list
      }
    }, 20) // Typing speed (faster for longer text?)

    return () => clearInterval(typingInterval)
  }, [sequenceStep])


  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "inherit"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const suggestedQuestions = [
    "How do I protect my phone number?",
    "What data brokers have my info?",
    "Can I get a virtual phone number?",
    "Is there a free trial?",
    "Why am I getting spam?"
  ]

  const simulateResponse = (question: string) => {
    // Add user message immediately (Manual interaction doesn't need typewriter for user)
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    }
    setMessages(prev => [...prev, userMessage])
    setIsInputDisabled(true) // Disable while AI thinks

    // Simulate AI thinking delay
    setTimeout(() => {
        // Here we could simulate typewriter for the AI response too if we wanted consistent behavior
        // For now, simple response append is fine, or we could reuse a "typing" state
        // Let's keep manual interaction instant for responsiveness, or use a simple loading state
      const response = PREDEFINED_RESPONSES[question] || 
        "Great question! DelistMe protects your privacy by removing your personal information from data brokers. Start a free scan above to see which sites have your data, or ask me something else!"
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsInputDisabled(false)
    }, 600 + Math.random() * 400) 
  }

  const handleSuggestionClick = (question: string) => {
    if (isInputDisabled) return
    simulateResponse(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (!trimmedInput || isInputDisabled) return

    // Check if it matches a predefined question (fuzzy match)
    const matchedQuestion = suggestedQuestions.find(q => 
      q.toLowerCase().includes(trimmedInput.toLowerCase()) ||
      trimmedInput.toLowerCase().includes(q.toLowerCase().replace("?", ""))
    )

    simulateResponse(matchedQuestion || trimmedInput)
    setInput("")
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      <div className="mb-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4">
          Tired of spam calls?{" "}
          <br className="sm:hidden" />
          <span className="text-green-500 dark:text-green-400">
            We fix that.
          </span>
        </h1>
        {/* <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
           Instant protection for your privacy and peace of mind.
        </p> */}
      </div>

      {/* Chat Container */}

      <div className="flex flex-col border border-border border-gray-300 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500/50 overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground tracking-tight">Privacy Assistant</span>
            <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
              AI
            </span>
          </div>
          <StatusIndicator state="active" label="Online" size="sm" className="opacity-80 scale-90" />
        </div>

        {/* Messages Area - Fixed height with internal scroll */}
        <div ref={chatContainerRef} className="h-[300px] overflow-y-auto p-5 space-y-4 bg-white dark:bg-slate-950 scroll-smooth">
            {/* Messages List */}
            {messages.map((m) => (
                <div
                key={m.id}
                className={cn(
                    "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                    m.role === "user" ? "justify-end" : "justify-start"
                )}
                >
                <div
                    className={cn(
                    "px-4 py-3 max-w-[85%]",
                    m.role === "user"
                        ? "bg-blue-100 dark:bg-blue-500/10 text-blue-900 dark:text-blue-50 rounded-xl shadow-sm text-xs"
                        : "bg-gray-100 dark:bg-gray-500/10 text-slate-900 dark:text-slate-100 rounded-xl shadow-sm text-xs"
                    )}
                >
                    <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>
                </div>
            ))}
            
            {/* Active Typewriter Bubbles */}
            {currentTypingRole && (
                 <div className={cn("flex w-full animate-in fade-in duration-200", currentTypingRole === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                        "px-4 py-3 max-w-[85%] rounded-xl shadow-sm text-xs",
                        currentTypingRole === 'user'
                        ? "bg-blue-100 dark:bg-blue-500/10 text-blue-900 dark:text-blue-50"
                        : "bg-gray-100 dark:bg-gray-500/10 text-slate-900 dark:text-slate-100"
                    )}>
                        <p className="leading-relaxed whitespace-pre-wrap">
                            {displayedText}
                            <span className="inline-block w-1.5 h-3.5 bg-slate-400 ml-0.5 animate-pulse align-middle" />
                        </p>
                    </div>
                </div>
            )}
            
            {/* Generic Loading Indicator (Manual Interaction) */}
            {!currentTypingRole && isInputDisabled && sequenceStep >= introSequence.length && (
                <div className="flex justify-start animate-in fade-in duration-200">
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.15s]" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                </div>
                </div>
            )}
          

          
        </div>

        {/* Suggestions Bar */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20">
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestionClick(question)}
                disabled={isInputDisabled}
                className={cn(
                  "inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                  "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800",
                  "text-slate-700 dark:text-slate-300",
                  "hover:bg-slate-50 hover:border-slate-300",
                  "dark:hover:bg-slate-700 dark:hover:border-slate-600",
                  "focus:outline-none focus:ring-2 focus:ring-slate-400/50",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
                )}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Large Input Area with Bottom Toolbar */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
            <form 
              onSubmit={handleSubmit} 
              className={cn(
                "relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all duration-200",
                "focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 focus-within:bg-white dark:focus-within:bg-slate-950 dark:focus-within:border-slate-600 dark:focus-within:ring-slate-800",
                "hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              {/* Main Textarea */}
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What would you like to know?"
                disabled={isInputDisabled}
                rows={1}
                className={cn(
                  "w-full bg-transparent border-0 resize-none",
                  "text-sm text-slate-900 dark:text-slate-100",
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                "focus:ring-0 focus:outline-none",
                "min-h-[80px] max-h-[160px] pt-6 pb-3 px-6",
                "disabled:opacity-50"
              )}
              style={{ height: "80px" }}
            />
            
            {/* Bottom Toolbar */}
            <div className="flex items-center justify-between px-4 pb-3 pt-0">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  disabled={isInputDisabled}
                  title="Attach file (Coming soon)"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
                
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2 gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400"
                  disabled={isInputDisabled}
                  title="DelistMe AI model"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>DelistMe AI</span>
                </Button>
              </div>
              
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isInputDisabled}
                className={cn(
                  "h-9 w-9 rounded-lg shrink-0 transition-all duration-200",
                  input.trim() && !isInputDisabled
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                )}
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Bottom Disclaimer */}
      <p className="mt-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
        DelistMe AI can make mistakes. Verify important information.
      </p>
    </div>
  )
}
