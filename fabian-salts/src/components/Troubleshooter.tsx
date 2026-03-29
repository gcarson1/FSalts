"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Thermometer, Wrench, ArrowRight, ShieldAlert } from "lucide-react"

const LOCATIONS = [
  { id: "kitchen", label: "Kitchen", icon: Droplet },
  { id: "bathroom", label: "Bathroom", icon: Droplet },
  { id: "basement", label: "Basement / Water Heater", icon: Thermometer },
]

const ISSUES: Record<string, { id: string; label: string; tip: string }[]> = {
  kitchen: [
    { id: "sink-leak", label: "Leaking under sink", tip: "Place a bucket underneath and locate the silver shut-off valves on the wall behind the pipes. Turn them clockwise to stop the water." },
    { id: "disposal", label: "Garbage disposal jammed", tip: "Never put your hand in the disposal! Press the small red reset button on the bottom of the unit under the sink." },
  ],
  bathroom: [
    { id: "toilet", label: "Running or leaking toilet", tip: "Turn the football-shaped valve behind the base of the toilet clockwise to shut off the water immediately." },
    { id: "shower", label: "No hot water in shower", tip: "Check if other faucets have hot water. If it's just the shower, the mixing valve cartridge likely needs replacing." },
  ],
  basement: [
    { id: "heater", label: "Water heater leaking", tip: "Turn off the cold water supply valve located on the pipe entering the top of the water heater immediately to prevent flooding." },
    { id: "sump", label: "Sump pump failed", tip: "Ensure the unit is plugged in and check your breaker box. Keep valuables off the basement floor until we arrive." },
  ]
}

export default function Troubleshooter() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<{label: string, tip: string} | null>(null)

  const handleLocation = (locId: string) => {
    setLocation(locId)
    setStep(2)
  }

  const handleIssue = (issue: any) => {
    setSelectedIssue(issue)
    setStep(3)
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-xl">
      <div className="bg-slate-900 p-4 text-center">
        <h3 className="text-lg font-bold text-slate-100 flex items-center justify-center gap-2">
          <Wrench className="h-5 w-5 text-blue-400" />
          Interactive Plumber&apos;s Assistant
        </h3>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <p className="mb-4 text-center text-slate-300">Where are you experiencing the issue?</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {LOCATIONS.map((loc) => (
                  <button key={loc.id} onClick={() => handleLocation(loc.id)} className="flex flex-col items-center gap-2 rounded-lg border border-slate-600 bg-slate-700 p-4 transition-colors hover:border-blue-400 hover:bg-slate-600">
                    <loc.icon className="h-8 w-8 text-blue-400" />
                    <span className="text-sm font-medium text-slate-200">{loc.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <p className="mb-4 text-center text-slate-300">What seems to be the problem?</p>
              <div className="grid gap-3">
                {ISSUES[location].map((issue) => (
                  <button key={issue.id} onClick={() => handleIssue(issue)} className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-700 p-4 text-left transition-colors hover:border-blue-400 hover:bg-slate-600">
                    <span className="font-medium text-slate-200">{issue.label}</span>
                    <ArrowRight className="h-5 w-5 text-blue-400" />
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-sm text-slate-400 hover:text-slate-200">← Back</button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedIssue && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-4">
                <h4 className="flex items-center gap-2 font-bold text-yellow-500">
                  <ShieldAlert className="h-5 w-5" />
                  Pro Tip: Mitigate the Damage
                </h4>
                <p className="mt-2 text-sm text-slate-300">{selectedIssue.tip}</p>
              </div>
              
              <div className="text-center">
                <p className="mb-4 text-slate-200">Have you secured the area? Let&apos;s get this fixed properly.</p>
                <a href="#booking-form" className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700 sm:w-auto">
                  Book a Plumber Now
                </a>
              </div>
              <button onClick={() => setStep(2)} className="mt-4 text-sm text-slate-400 hover:text-slate-200">← Start Over</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}