"use client"

import { Phone, Wrench, Award } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-lg supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto px-4">
        {/* Top bar with certifications */}
        <div className="py-2 px-4 -mx-4 border-b border-slate-800/30 bg-gradient-to-r from-blue-600/5 to-transparent">
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <Award className="h-3 w-3 text-blue-400" />
            Certified Professional • Licensed • Bonded • Insured
          </p>
        </div>

        {/* Main header */}
        <div className="flex h-20 items-center justify-between">
<Link href="/" className="flex items-center gap-2 text-slate-100 hover:text-white transition-colors group">
          <div>
            <div className="text-2xl font-black tracking-tight leading-none">
                SALTS BROTHERS
              </div>
              <div className="text-xs tracking-widest text-blue-400 font-black">PLUMBING EXCELLENCE</div>
            </div>
          </Link>
          
          {/* Premium CTA */}
          <a 
            href="tel:+15551234567" 
            className="flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-400 to-red-600 blur-lg transition-all duration-300"></div>
            <Phone className="h-5 w-5 relative animate-pulse" />
            <span className="hidden sm:inline relative">Emergency: 555-123-4567</span>
            <span className="sm:hidden relative">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  )
}