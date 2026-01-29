"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp, Paperclip, Mic, Image as ImageIcon } from "lucide-react"
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
  // Initialize with empty array on client to allow typing effect, 
  // but keep INITIAL_MESSAGES in source for potential SSR if needed later.
  // Actually, to avoid flash, we start empty and let the effect type it in.
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  // Removed isInputDisabled state effectively by expecting interaction always allowed
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
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
      delayAfter: 800 // Reduced delay
    },
    {
      role: "user" as const,
      content: "How do I protect my phone number?",
      delayAfter: 800
    },
    {
      role: "assistant" as const,
      content: PREDEFINED_RESPONSES["How do I protect my phone number?"],
      delayAfter: 1500
    },
    {
      role: "user" as const,
      content: "Is there a free trial?",
      delayAfter: 800
    },
    {
      role: "assistant" as const,
      content: PREDEFINED_RESPONSES["Is there a free trial?"],
      delayAfter: 0 // End of sequence
    }
  ]

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, displayedText])

  // Master Sequence Controller
  useEffect(() => {
    if (sequenceStep === -1) return
    if (sequenceStep >= introSequence.length) {
      setCurrentTypingRole(null)
      return
    }

    const currentItem = introSequence[sequenceStep]
    setCurrentTypingRole(currentItem.role)
    
    let charIndex = 0
    let typingInterval: NodeJS.Timeout

    // Optimize speed: First message (index 0) is faster
    const typingSpeed = sequenceStep === 0 ? 10 : 25; 

    // Start typing
    typingInterval = setInterval(() => {
      charIndex++
      // For very first message, we can jump start heavily to appear almost instant
      if (sequenceStep === 0 && charIndex < 5) charIndex += 3; 

      setDisplayedText(currentItem.content.slice(0, charIndex))

      if (charIndex >= currentItem.content.length) {
        clearInterval(typingInterval)
        
        // Typing finished custom logic
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: `intro-${sequenceStep}`,
                role: currentItem.role,
                content: currentItem.content
            }])
            setDisplayedText("")
            setCurrentTypingRole(null)

            setTimeout(() => {
                setSequenceStep(prev => prev + 1)
            }, currentItem.delayAfter)

        }, 400) 
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [sequenceStep])


  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "inherit"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`
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
    // Add user message immediately
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    }
    setMessages(prev => [...prev, userMessage])
    // We don't disable input anymore

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = PREDEFINED_RESPONSES[question] || 
        "Great question! DelistMe protects your privacy by removing your personal information from data brokers. Start a free scan above to see which sites have your data, or ask me something else!"
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 600 + Math.random() * 400) 
  }

  const handleSuggestionClick = (question: string) => {
    simulateResponse(question)
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmedInput = input.trim()
    if (!trimmedInput) return

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
      
      <div className="flex flex-col border border-border border-gray-300 bg-white/90 dark:bg-black/80 backdrop-blur-xl rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground tracking-tight">Privacy Assistant</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
              AI
            </span>
          </div>
          <StatusIndicator state="active" label="Online" size="sm" className="opacity-80 scale-90" />
        </div>

        {/* Messages Area */}
        <div ref={chatContainerRef} className="h-[350px] overflow-y-auto p-5 space-y-4 bg-white dark:bg-slate-950 scroll-smooth">
            {/* Messages List */}
            {messages.map((m) => (
                <div
                key={m.id}
                className={cn(
                    "flex w-full duration-300",
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
                        {/* If text exists, show it, otherwise bounce dots */}
                        {displayedText ? (
                            <p className="leading-relaxed whitespace-pre-wrap">
                                {displayedText}
                                <span className="inline-block w-1.5 h-3 ml-0.5 bg-current align-middle animate-pulse"/>
                            </p>
                        ) : (
                            <div className="flex space-x-1 h-4 items-center">
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Redesigned to be larger and richer */}
        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-border/40">
            {/* Suggested Questions */}
            {messages.length < 2 && (
                <div className="mb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(question)}
                            className="text-xs bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full transition-colors duration-200 shadow-sm"
                        >
                            {question}
                        </button>
                    ))}
                </div>
            )}

          <div className="relative z-10 bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
            <form
                onSubmit={(e) => {
                e.preventDefault() 
                handleSubmit()
                }}
                className="flex flex-col"
            >
                <textarea
                    ref={inputRef}
                    placeholder="Ask anything about spam protection..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onKeyDown={(e) => handleKeyDown(e)}
                    rows={1}
                    className="w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none min-h-[60px] max-h-[200px]"
                />
                
                <div className="flex items-center justify-between px-2 pb-2 pl-3">
                    <div className="flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Mic className="h-4 w-4" />
                        </Button>
                    </div>

                    <Button 
                        type="submit" 
                        size="icon" 
                        disabled={!input.trim()}
                        className={cn(
                            "rounded-lg h-8 w-8 shrink-0 transition-all duration-200",
                            input.trim()
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20" 
                                : "bg-gray-100 dark:bg-gray-800 text-gray-300 cursor-not-allowed"
                        )}
                    >
                        <ArrowUp className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </form>
          </div>
          
          <div className="flex items-center justify-center mt-3 gap-1.5 opacity-60">
            <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 font-medium">
                AI can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
