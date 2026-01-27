"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AppleHelloEffectProps {
  text: string
  className?: string
  duration?: number
  delay?: number
}

export function AppleHelloEffect({ 
  text, 
  className,
  duration = 2,
  delay = 0.5
}: AppleHelloEffectProps) {
  const words = text.split(" ")
  
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const overallIndex = words.slice(0, wordIndex).join("").length + wordIndex + charIndex
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: delay + (overallIndex * 0.03),
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

interface TypewriterEffectProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function TypewriterEffect({
  text,
  className,
  speed = 50,
  delay = 500,
  onComplete
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = React.useState("")
  const [isComplete, setIsComplete] = React.useState(false)
  
  React.useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)
    
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)
      
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [text, speed, delay, onComplete])

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function GradientText({ 
  children, 
  className,
  from = "from-blue-600",
  via = "via-purple-600",
  to = "to-pink-600"
}: GradientTextProps) {
  return (
    <span className={cn(
      "bg-gradient-to-r bg-clip-text text-transparent",
      from, via, to,
      className
    )}>
      {children}
    </span>
  )
}
