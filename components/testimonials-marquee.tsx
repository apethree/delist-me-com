"use client"

import { Marquee, MarqueeItem } from "@/components/kibo-ui/marquee"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const testimonials = [
  {
    author: "Sarah J.",
    role: "Small Business Owner",
    content: "Stopped 15+ spam calls/day immediately.",
    fullContent: "I was getting 15+ spam calls every single day. After using DelistMe, it dropped to zero within a week. The peace of mind is incredible. My phone is actually useful again instead of being a constant source of stress.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    author: "Jessica M.",
    role: "Healthcare Professional",
    content: "This virtual phone number saved my life.",
    fullContent: "This virtual phone number saved my life. I use it for everything online and sign-ups. all the spam goes there, and my real phone stays completely clean and quiet. It's the best privacy tool I've ever used.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=jessica"
  },
  {
    author: "Marcus B.",
    role: "Tech Consultant",
    content: "No more spam texts. It's actually a miracle.",
    fullContent: "I was drowning in political texts and spam links. DelistMe filtered them all out. My messages are finally just from friends and family again. It's actually a miracle how well it works.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    author: "David L.",
    role: "Financial Advisor",
    content: "Better than Do Not Call registry. Actually works.",
    fullContent: "I've been on the Do Not Call registry for years and it never worked. DelistMe actually stops spam at the source by removing your data from brokers. Within 2 weeks, my spam calls went from 10+ per day to maybe 1 per week. This actually works!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=david"
  },
  {
    author: "Amanda C.",
    role: "Freelancer",
    content: "My personal number is finally private again.",
    fullContent: "I use the virtual phone for all my business calls. It saved me from carrying two phones. My personal number is finally private again, and I can disconnect when work is done. Essential for freelancers.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=amanda"
  },
  {
    author: "Emily R.",
    role: "Marketing Director",
    content: "Deleted my info from 40+ sites. Amazing.",
    fullContent: "I had no idea how many data broker sites were selling my information. DelistMe found and removed my details from over 40 sites! The dashboard shows exactly what was removed and when. Highly recommend to anyone who values their privacy.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=emily"
  }
]

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

