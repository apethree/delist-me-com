"use client"

import { motion } from "framer-motion"

export function BlinkingCursor() {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
      className="inline-block w-3 h-[0.8em] md:w-4 md:h-[0.8em] translate-y-[0.1em] bg-blue-600 dark:bg-blue-500 ml-1 rounded-sm align-baseline"
    />
  )
}
