'use client'

import * as React from 'react'
import { cn } from '../lib/utils'
import { Button } from './button'
import { ArrowRight, Check } from 'lucide-react'

interface OnboardingSlide {
  id: string
  title: string
  description: string
  backgroundColor: string
  image?: React.ReactNode
}

const slides: OnboardingSlide[] = [
  {
    id: 'slide-1',
    title: 'Welcome to DelistMe',
    description: 'Take control of your personal data online.',
    backgroundColor: 'bg-blue-500', 
  },
  {
    id: 'slide-2',
    title: 'Scan \u0026 Remove',
    description: 'We scan data brokers and automatically remove your info.',
    backgroundColor: 'bg-purple-500',
  },
  {
    id: 'slide-3',
    title: 'Stay Protected',
    description: 'Continuous monitoring ensures your data stays private.',
    backgroundColor: 'bg-green-500',
  },
]

interface OnboardingSliderProps {
  onComplete: () => void
}

export function OnboardingSlider({ onComplete }: OnboardingSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onComplete()
    }
  }

  const currentSlide = slides[currentIndex]

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center h-screen w-full transition-colors duration-500 ease-in-out px-6 text-white',
        currentSlide.backgroundColor
      )}
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Placeholder for Image/Illustration */}
        <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
           <span className="text-4xl font-bold">{currentIndex + 1}</span>
        </div>

        <div className="text-center space-y-4 max-w-xs">
          <h2 className="text-3xl font-bold tracking-tight">{currentSlide.title}</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {currentSlide.description}
          </p>
        </div>
      </div>

      <div className="w-full pb-12 flex items-center justify-between">
        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-300',
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
              )}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all active:scale-95"
        >
          {currentIndex === slides.length - 1 ? (
            <span className="flex items-center">
              Get Started <Check className="ml-2 h-5 w-5" />
            </span>
          ) : (
            <span className="flex items-center">
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
