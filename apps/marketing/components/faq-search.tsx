"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@delistme/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@delistme/ui"

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  items: FaqItem[]
}

interface FaqSearchProps {
  faqs: FaqCategory[]
}

export function FaqSearch({ faqs }: FaqSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0)

  return (
    <>
      {/* Search */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 rounded-2xl border-border/60 bg-muted/30 pl-11 text-base"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8">
        {filteredFaqs.length === 0 ? (
          <div className="rounded-3xl bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          filteredFaqs.map((category) => (
            <div key={category.category}>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="rounded-2xl border-none bg-muted/30 px-6"
                  >
                    <AccordionTrigger className="py-5 text-left font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        )}
      </div>
    </>
  )
}
