"use client"

import { Marquee } from "@/components/kibo-ui/marquee"
import { 
  AppleLogo, GoogleLogo, MicrosoftLogo, TMobileLogo, VerizonLogo, AttLogo,
  TechCrunchLogo, TheVergeLogo, WiredLogo, ForbesLogo, WsjLogo, NyTimesLogo 
} from "@/components/logos"

const PARTNERS = [
  { name: "Apple", Logo: AppleLogo },
  { name: "Google", Logo: GoogleLogo },
  { name: "Microsoft", Logo: MicrosoftLogo },
  { name: "T-Mobile", Logo: TMobileLogo },
  { name: "Verizon", Logo: VerizonLogo },
  { name: "AT&T", Logo: AttLogo },
]

const MEDIA = [
  { name: "TechCrunch", Logo: TechCrunchLogo },
  { name: "The Verge", Logo: TheVergeLogo },
  { name: "Wired", Logo: WiredLogo },
  { name: "Forbes", Logo: ForbesLogo },
  { name: "WSJ", Logo: WsjLogo },
  { name: "NY Times", Logo: NyTimesLogo },
]

export function SocialProofSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col justify-center py-8 md:py-12 bg-white dark:bg-black overflow-hidden relative">
        <p className="text-xs text-gray-500 mb-6 text-center uppercase tracking-widest font-medium">
          Trusted Security
        </p>
        <Marquee className="py-2" pauseOnHover>
          {PARTNERS.map(({ name, Logo }, i) => (
            <div key={i} className="flex items-center justify-center px-8 opacity-70 hover:opacity-100 transition-opacity">
               <Logo className="h-8 w-auto max-w-[120px] object-contain" />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-black"></div>
      </div>
      
      <div className="flex flex-col justify-center py-8 md:py-12 bg-white dark:bg-black overflow-hidden relative">
        <p className="text-xs text-gray-500 mb-6 text-center uppercase tracking-widest font-medium">
          Used By
        </p>
        <Marquee className="py-2" reverse pauseOnHover>
          {MEDIA.map(({ name, Logo }, i) => (
            <div key={i} className="flex items-center justify-center px-8 opacity-70 hover:opacity-100 transition-opacity">
               <Logo className="h-6 w-auto max-w-[120px] object-contain" /> 
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-black"></div>
      </div>
    </div>
  )
}
