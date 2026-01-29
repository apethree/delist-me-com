"use client"

import { Marquee, MarqueeItem } from "@/components/kibo-ui/marquee"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { testimonials } from "@/lib/testimonials-data"

export function TestimonialsMarqueeSection() {
  // Split testimonials into two groups for opposite direction marquees
  const firstRowTestimonials = testimonials.slice(0, 3)
  const secondRowTestimonials = testimonials.slice(3, 6)

  return (
    <section className="bg-white dark:bg-black relative">
      <div className="mx-auto w-full overflow-hidden">
    

        {/* Second marquee - right to left (reverse) */}
        <Marquee pauseOnHover reverse className="[--duration:120s] [--gap:2rem]">
          {secondRowTestimonials.map((testimonial, idx) => (
            <MarqueeItem key={idx} className="flex items-center gap-2 px-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 min-w-max cursor-pointer hover:opacity-80 transition-opacity">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={testimonial.image} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{testimonial.author}:</span>
                    <span className="text-xs text-gray-800 truncate max-w-[320px]">"{testimonial.content}"</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" side="bottom" align="start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.image} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground">{testimonial.author}</h4>
                        <p className="text-xs text-gray-800">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      "{testimonial.fullContent}"
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

