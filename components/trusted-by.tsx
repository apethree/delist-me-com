"use client"

export function TrustedBy() {
  return (
    <section className="w-full bg-white dark:bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-gray-200 dark:border-gray-800 px-0">
        
        {/* Left Column: Security Experts */}
        <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 mb-6 uppercase tracking-widest">
            Top security experts from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full max-w-sm">
            {/* Apple */}
            <svg className="h-6 md:h-8 text-slate-900 dark:text-white" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
            </svg>
            
            {/* Google */}
            <svg className="h-5 md:h-7" viewBox="0 0 272 92">
              <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
              <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
              <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
              <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
              <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
              <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
            </svg>
            
            {/* NASA */}
            <svg className="h-5 md:h-6 text-slate-900 dark:text-white" viewBox="0 0 110 44" fill="currentColor">
              <path d="M0,24.25h6.72L23.53,0h6.97L13.69,24.25h6.62L37.13,0h7.02L27.34,24.25h9.02l22.25-24.25h6.97L41.81,24.25h6.72L72.63,0h6.97L55.79,24.25h19.75V44H0V24.25z"/>
            </svg>

            {/* Microsoft */}
             <svg className="h-5 md:h-6" viewBox="0 0 23 23">
                <path fill="#F25022" d="M1 1h10v10H1z"/>
                <path fill="#00A4EF" d="M1 12h10v10H1z"/>
                <path fill="#7FBA00" d="M12 1h10v10H12z"/>
                <path fill="#FFB900" d="M12 12h10v10H12z"/>
              </svg>
          </div>
        </div>

        {/* Right Column: Recommended By */}
        <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center">
           <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 mb-6 uppercase tracking-widest">
            Recommended and used by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 w-full max-w-sm grayscale opacity-90">
             {/* TechCrunch - Text based SVG */}
             <svg viewBox="0 0 150 24" className="h-4 md:h-5 text-slate-800 dark:text-slate-200 fill-current">
                 <text x="0" y="20" fontFamily="sans-serif" fontWeight="bold" fontSize="24">TechCrunch</text>
             </svg>
             
             {/* Forbes */}
              <svg viewBox="0 0 100 24" className="h-4 md:h-5 text-slate-800 dark:text-slate-200 fill-current">
                 <text x="0" y="20" fontFamily="serif" fontWeight="900" fontSize="24">Forbes</text>
             </svg>

             {/* WIRED */}
             <svg viewBox="0 0 100 24" className="h-4 md:h-5 text-slate-800 dark:text-slate-200 fill-current">
                 <text x="0" y="20" fontFamily="monospace" fontWeight="bold" fontSize="24" letterSpacing="-1">WIRED</text>
             </svg>
          </div>
        </div>

      </div>
    </section>
  )
}
