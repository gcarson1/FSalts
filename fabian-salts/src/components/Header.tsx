"use client"

import { Phone, Wrench } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-slate-100">
          <Wrench className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold tracking-tight">Fabian Salts <span className="text-blue-400">Plumbing</span></span>
        </Link>
        
        {/* Mobile-dominating CTA */}
        <a 
          href="tel:+15551234567" 
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <Phone className="h-4 w-4 animate-pulse" />
          <span className="hidden sm:inline">Emergency Service: </span>
          555-123-4567
        </a>
      </div>
    </header>
  )
}