"use client"

import dynamic from "next/dynamic"

// Lazy load heavy components on client side only
export const HeroChat = dynamic(() => import("@/components/hero-chat").then(mod => ({ default: mod.HeroChat })), {
  loading: () => <div className="w-full h-[400px] animate-pulse bg-gray-100 dark:bg-gray-900 rounded-2xl" />,
  ssr: false
})

