"use client"

import dynamic from 'next/dynamic'
import React from 'react'

export const Threads = dynamic(() => import('@/components/backgrounds/threads'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />
})

export const SpamReductionChart = dynamic(
  () => import('@/components/charts/spam-reduction').then(m => ({ default: m.SpamReductionChart })),
  { ssr: false, loading: () => <div className="h-[250px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" /> }
)

export const CallFilteringFlow = dynamic(
  () => import('@/components/charts/call-filtering-flow').then(m => ({ default: m.CallFilteringFlow })),
  { ssr: false, loading: () => <div className="h-40 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" /> }
)

export const SpamTrendChart = dynamic(
  () => import('@/components/charts/spam-trend-chart').then(m => ({ default: m.SpamTrendChart })),
  { ssr: false, loading: () => <div className="h-40 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" /> }
)
