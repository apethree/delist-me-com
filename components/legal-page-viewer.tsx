"use client"

import { useState } from "react"

interface Section {
  id: string
  title: string
  tldr: string
  content: string
}

interface LegalPageViewerProps {
  sections: Section[]
}

export function LegalPageViewer({ sections }: LegalPageViewerProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "")

  return (
    <div className="flex flex-col gap-12 md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="shrink-0 md:sticky md:top-24 md:h-fit md:w-48">
        <ul className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:gap-1 md:pb-0">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {sections.map((section) => (
          <section
            key={section.id}
            className={activeSection === section.id ? "block" : "hidden"}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            
            {/* TL;DR Box */}
            <div className="mt-4 rounded-2xl bg-primary/5 p-4">
              <p className="text-sm">
                <span className="font-semibold text-primary">TL;DR:</span>{" "}
                <span className="text-foreground">{section.tldr}</span>
              </p>
            </div>

            {/* Full Content */}
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
