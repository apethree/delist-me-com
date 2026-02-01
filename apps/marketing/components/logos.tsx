"use client"

import React from "react"

// --- Helper for standard sizing ---
const SVGWrapper = ({ children, className, viewBox = "0 0 24 24" }: { children: React.ReactNode; className?: string; viewBox?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox={viewBox} className="w-full h-full fill-current">
      {children}
    </svg>
  </div>
)

// --- Partners ---

export const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 814 1000" className={className} fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
  </svg>
)

export const GoogleLogo = ({ className }: { className?: string }) => (
  // Google "G" Logo - official colors
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
)

export const MicrosoftLogo = ({ className }: { className?: string }) => (
  // Sourced from SVGL
  <svg viewBox="0 0 256 256" className={className}>
    <path fill="#F1511B" d="M121.666 121.666H0V0h121.666z"/>
    <path fill="#80CC28" d="M256 121.666H134.335V0H256z"/>
    <path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z"/>
    <path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z"/>
  </svg>
)

export const TMobileLogo = ({ className }: { className?: string }) => (
    // Sourced from WorldVectorLogo (t-mobile-1.svg)
    <img src="https://cdn.worldvectorlogo.com/logos/t-mobile-1.svg" alt="T-Mobile" className={className} />
)

export const VerizonLogo = ({ className }: { className?: string }) => (
   // Sourced from WorldVectorLogo
   <img src="https://cdn.worldvectorlogo.com/logos/verizon.svg" alt="Verizon" className={className} />
)

export const AttLogo = ({ className }: { className?: string }) => (
   <img src="https://cdn.worldvectorlogo.com/logos/at-t-1.svg" alt="AT&T" className={className} />
)

export const NasaLogo = ({ className }: { className?: string }) => (
    <img src="https://cdn.worldvectorlogo.com/logos/nasa-6.svg" alt="NASA" className={className} />
)


// --- Media ---

export const TechCrunchLogo = ({ className }: { className?: string }) => (
    // Sourced from SimpleIcons
    <svg role="img" viewBox="0 0 24 24" className={className} fill="#02D14B" style={{ filter: 'brightness(0.9)'}}>
       <path d="M0 6v4h4v8h4v-8h4V6Zm12 4v8h12v-4h-8v-4zm4 0h8V6h-8z"/>
    </svg>
)

export const TheVergeLogo = ({ className }: { className?: string }) => (
    <img src="https://cdn.worldvectorlogo.com/logos/the-verge.svg" alt="The Verge" className={className} />
)

export const WiredLogo = ({ className }: { className?: string }) => (
    // Text-based fallback (Font approximate)
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
       <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="20" letterSpacing="-1">WIRED</text>
    </svg>
)

export const ForbesLogo = ({ className }: { className?: string }) => (
    // Text-based fallback (Font approximate)
    <svg viewBox="0 0 100 24" className={className} fill="currentColor">
       <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="22">Forbes</text>
    </svg>
)

export const WsjLogo = ({ className }: { className?: string }) => (
    <img src="https://cdn.worldvectorlogo.com/logos/wall-street-journal.svg" alt="WSJ" className={`${className} dark:invert`} />
)

export const NyTimesLogo = ({ className }: { className?: string }) => (
    // Sourced from SimpleIcons (New York Times)
    <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
       <path d="M21.272,14.815h-0.098c-0.747,2.049-2.335,3.681-4.363,4.483v-4.483l2.444-2.182l-2.444-2.182V7.397 c2.138,0.006,3.885-1.703,3.927-3.84c0-2.629-2.509-3.556-3.927-3.556c-0.367-0.007-0.734,0.033-1.091,0.12v0.131h0.556 c0.801-0.141,1.565,0.394,1.706,1.195C17.99,1.491,17.996,1.537,18,1.583c-0.033,0.789-0.7,1.401-1.488,1.367 c-0.02-0.001-0.041-0.002-0.061-0.004c-2.444,0-5.323-1.985-8.454-1.985C5.547,0.83,3.448,2.692,3.284,5.139 C3.208,6.671,4.258,8.031,5.76,8.346v-0.12C5.301,7.931,5.041,7.407,5.084,6.862c0.074-1.015,0.957-1.779,1.973-1.705 C7.068,5.159,7.08,5.16,7.091,5.161c2.629,0,6.872,2.182,9.501,2.182h0.098v3.142l-2.444,2.182l2.444,2.182v4.549 c-0.978,0.322-2.003,0.481-3.033,0.469c-1.673,0.084-3.318-0.456-4.614-1.516l4.429-1.985V7.451l-6.196,2.727 c0.592-1.75,1.895-3.168,3.589-3.905V6.175c-4.516,1.004-8.138,4.243-8.138,8.705c0,5.193,4.025,9.12,9.818,9.12 c6.011,0,8.727-4.363,8.727-8.814V14.815z M8.858,18.186c-1.363-1.362-2.091-3.235-2.007-5.16c-0.016-0.88,0.109-1.756,0.371-2.596 l2.051-0.938v8.476L8.858,18.186z"/>
    </svg>
)
