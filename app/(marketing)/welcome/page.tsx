"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function WelcomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleContinue = () => {
    router.push("/authorize")
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[800px] w-[800px] rounded-full bg-gradient-to-br from-primary to-destructive blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center px-4"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 text-6xl sm:text-7xl md:text-8xl font-bold">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              DelistMe
            </span>
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-4 mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground/90">
            Welcome to <span className="text-foreground">Privacy</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
            Your journey to a spam-free phone starts now
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button
            onClick={handleContinue}
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-background bg-foreground rounded-lg shadow-2xl shadow-foreground/30 transition-all hover:scale-105 hover:shadow-foreground/40"
          >
            <span>Let's Protect Your Phone</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Skip option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          onClick={handleContinue}
          className="mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip introduction
        </motion.button>
      </motion.div>

      {/* Subtle particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0 }}
            animate={{
              y: "-10vh",
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute h-2 w-2 rounded-full bg-foreground/10"
          />
        ))}
      </div>
    </div>
  )
}
