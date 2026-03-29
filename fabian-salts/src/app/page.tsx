import Header from "@/components/Header"
import Troubleshooter from "@/components/Troubleshooter"
import ServiceRequestForm from "@/components/ServiceRequestForm"
import { Shield, Clock, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="bg-slate-950 px-4 py-20 text-center sm:py-32">
          <div className="container mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Honest Plumbing. <span className="text-blue-500">Zero Bull.</span>
            </h1>
            <p className="mb-10 text-lg text-slate-400 sm:text-xl">
              From emergency leaks to routine installs, Fabian Salts delivers salt-of-the-earth service. No hidden fees, just problems solved.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#booking-form" className="w-full rounded-md bg-red-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-red-700 sm:w-auto">
                Request Emergency Service
              </a>
              <a href="#troubleshoot" className="w-full rounded-md border border-slate-700 bg-slate-800 px-8 py-4 text-lg font-bold text-slate-200 transition hover:bg-slate-700 sm:w-auto">
                Diagnose My Problem
              </a>
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS */}
        <section className="border-y border-slate-800 bg-slate-900 py-10">
          <div className="container mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Clock className="mb-3 h-10 w-10 text-blue-400" />
              <h3 className="font-bold text-slate-100">24/7 Dispatch</h3>
              <p className="text-sm text-slate-400">Because pipes don't care what time it is.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="mb-3 h-10 w-10 text-blue-400" />
              <h3 className="font-bold text-slate-100">Licensed & Insured</h3>
              <p className="text-sm text-slate-400">Total peace of mind for your property.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Wrench className="mb-3 h-10 w-10 text-blue-400" />
              <h3 className="font-bold text-slate-100">Upfront Pricing</h3>
              <p className="text-sm text-slate-400">Know the cost before we turn a wrench.</p>
            </div>
          </div>
        </section>

        {/* TROUBLESHOOTER SECTION */}
        <section id="troubleshoot" className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">Not sure what's wrong?</h2>
            <p className="mb-10 text-slate-400">Use our diagnostic tool to pinpoint the issue and learn how to stop the damage before we arrive.</p>
            <Troubleshooter />
          </div>
        </section>

        {/* BOOKING SECTION */}
        <section className="bg-slate-950 px-4 py-20">
          <div className="container mx-auto">
            <ServiceRequestForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-slate-500">
        <p>© {new Date().getFullYear()} Fabian Salts Plumbing. All rights reserved.</p>
      </footer>
    </div>
  )
}