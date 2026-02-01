import { testimonials } from "@/lib/testimonials-data"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@delistme/ui"
import { cn } from "@delistme/ui"

export function TestimonialsGrid() {
  return (
    <section className="py-24 bg-white dark:bg-black font-sans">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
            What early users say about DelistMe
          </h2>
          <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-lg">
            Join thousands of people who have taken back control of their personal information.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-800">
                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.author}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                {/* Twitter/X icon style verification badge if desired, or just omit like Vercel often does */}
              </div>
              
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                  {testimonial.content}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {testimonial.fullContent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
