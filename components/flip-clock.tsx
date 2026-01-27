"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FlipClockProps {
  value: number
  duration?: number
}

function FlipDigit({ digit }: { digit: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={digit}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="relative flex items-center justify-center w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-b from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 rounded-lg shadow-xl border border-zinc-700 dark:border-zinc-300"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <span className="text-3xl sm:text-4xl font-bold text-white dark:text-zinc-900 tabular-nums">
          {digit}
        </span>
        
        {/* Top half shadow */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
        
        {/* Middle divider */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-zinc-50 -translate-y-1/2" />
      </motion.div>
    </AnimatePresence>
  )
}

export function FlipClock({ value, duration = 3000 }: FlipClockProps) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, duration)

    return () => clearInterval(interval)
  }, [duration])

  // Convert number to array of digits with padding
  const digits = count.toString().padStart(6, "0").split("")

  return (
    <div className="flex gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <FlipDigit key={`${index}-${digit}`} digit={digit} />
      ))}
    </div>
  )
}
