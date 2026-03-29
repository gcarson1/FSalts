"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplet, Thermometer, Wrench, ArrowRight, ShieldAlert, AlertTriangle, CheckCircle2, Zap } from "lucide-react"

const LOCATIONS = [
  { id: "kitchen", label: "🍽️ Kitchen", desc: "Sink, faucet, or disposal" },
  { id: "bathroom", label: "🚿 Bathroom", desc: "Toilet, shower, or vanity" },
  { id: "basement", label: "🔥 Water Heater / Basement", desc: "Leaks, temperature, or flooding" },
  { id: "general", label: "🔧 General / Whole House", desc: "Main line, pressure, or other" },
]

const ISSUES: Record<string, { id: string; label: string; severity: "critical" | "high" | "medium" | "low"; tip: string; steps: string[]; shouldCall: string }[]> = {
  kitchen: [
    { 
      id: "sink-leak", 
      label: "Leaking under sink", 
      severity: "high",
      tip: "Water pooling under the sink can damage cabinets and cause mold.",
      steps: [
        "Place towels under the sink immediately to contain the leak",
        "Look for silver ball valves on the pipes against the wall behind the sink",
        "Turn both valves clockwise slowly until water stops dripping",
        "Take a photo of the connection point where it's leaking"
      ],
      shouldCall: "We can typically fix under-sink leaks same-day. Call now for fastest service."
    },
    { 
      id: "disposal", 
      label: "Garbage disposal jammed/broken", 
      severity: "medium",
      tip: "A jammed disposal is a safety hazard - never reach inside.",
      steps: [
        "DO NOT reach into the disposal under any circumstances",
        "Unplug the unit or flip the breaker to kill power completely",
        "Press the small red reset button on the bottom of the unit (under the sink)",
        "Wait 5 minutes, then restore power and test carefully with cold water only"
      ],
      shouldCall: "If it doesn't reset, the motor or impeller needs professional replacement."
    },
    {
      id: "low-pressure",
      label: "Very low water pressure at sink",
      severity: "medium",
      tip: "Low pressure could indicate a clog or aerator issue - easy fix!",
      steps: [
        "Check if the issue is only at this faucet or at all kitchen faucets",
        "Unscrew the aerator (screen at the faucet tip) by hand",
        "Rinse debris from the aerator screen under running water",
        "Screw the aerator back on - this often restores pressure completely"
      ],
      shouldCall: "If pressure is still low everywhere, call for a professional water pressure check."
    },
  ],
  bathroom: [
    { 
      id: "toilet", 
      label: "Running or leaking toilet", 
      severity: "high",
      tip: "A running toilet wastes 200+ gallons per day. Fix immediately!",
      steps: [
        "Lift the toilet tank lid carefully and set aside",
        "Look in the tank - is water continuously flowing or leaking from the fill valve?",
        "If water drips from the flapper, quickly turn the water shut-off valve clockwise behind the toilet",
        "Try gently jiggling the tank handle - sometimes sediment is stuck"
      ],
      shouldCall: "Most toilet repairs are $200 or less. We can fix same-day emergency repairs."
    },
    { 
      id: "shower", 
      label: "No hot water in shower (when sink has it)", 
      severity: "medium",
      tip: "This usually means the mixing valve cartridge needs replacing.",
      steps: [
        "Verify that OTHER faucets (bathroom sink, kitchen) have hot water",
        "Check the shower valve handle - does it move freely or feel stuck?",
        "If stuck, DO NOT force it - your plumber can safely replace the cartridge",
        "Note: This is almost never an emergency unless water is scalding hot"
      ],
      shouldCall: "Schedule a service call - cartridge replacement is quick (30-45 min) and typically $150-300."
    },
    {
      id: "clog",
      label: "Drain is slow or clogged",
      severity: "medium",
      tip: "Most drains clog from hair and soap buildup - preventable!",
      steps: [
        "Remove visible hair from the drain opening",
        "Try a plunger over the drain with a few inches of water",
        "If available, use a drain snake to pull out clogs (they're cheap!)",
        "AVOID chemical drain cleaners if possible - they damage pipes"
      ],
      shouldCall: "If DIY methods don't work, we have professional drain cleaning equipment."
    },
  ],
  basement: [
    { 
      id: "heater-leak", 
      label: "Water heater leaking", 
      severity: "critical",
      tip: "Act fast - a leaking water heater can cause serious damage and mold.",
      steps: [
        "IMMEDIATELY turn the cold water supply valve clockwise at the TOP of the water heater",
        "Place large towels or buckets under the leak",
        "If water is pooling on the floor, use towels to dam it away from electrical outlets",
        "Take photos of the leak location for your insurance company"
      ],
      shouldCall: "CALL IMMEDIATELY - This is an emergency. Water heaters usually need replacement ($1,500-2,500)."
    },
    { 
      id: "sump-pump", 
      label: "Sump pump failed or not running", 
      severity: "critical",
      tip: "A failed sump pump can cause basement flooding in 24 hours.",
      steps: [
        "Check that the pump is plugged in - test by plugging in a lamp in that outlet",
        "Look at your home's breaker box - check if the basement circuit breaker has tripped",
        "If tripped, do NOT reset it - there may be a short circuit or wiring issue",
        "Verify water isn't backing up into the basin - call immediately if it is"
      ],
      shouldCall: "CALL IMMEDIATELY - This is emergency-level. We provide 24/7 emergency dispatch."
    },
    {
      id: "heater-temp",
      label: "Water heater not producing hot water",
      severity: "high",
      tip: "Check a few things before assuming the heater is broken.",
      steps: [
        "Verify the thermostat is set to at least 120°F (check the dial on the tank)",
        "Wait 30 minutes if you recently used all the hot water - heater needs recovery time",
        "Check your electrical panel - is the breaker for the heater tripped?",
        "Feel the tank - is it warm to the touch? A cold tank means it's not heating"
      ],
      shouldCall: "If the tank feels cold or water is only lukewarm after 30 minutes, the heating element likely failed."
    }
  ],
  general: [
    {
      id: "main-shut",
      label: "Can't find your main water shut-off",
      severity: "high",
      tip: "Every homeowner should know where this is - it's critical in emergencies.",
      steps: [
        "Check your basement or crawl space near where the water line enters the house",
        "Look for a valve with a handle (wheel or lever) - usually on a copper or PVC pipe",
        "If you can't locate it, call your water company - they can tell you the location",
        "Take a photo and label it so you can find it in an emergency"
      ],
      shouldCall: "We can locate and mark your main shut-off during any service visit."
    },
    {
      id: "water-pressure",
      label: "Low water pressure throughout house",
      severity: "medium",
      tip: "Low pressure can indicate a larger issue - professional diagnosis needed.",
      steps: [
        "Check if the pressure issue started suddenly or gradually",
        "Look at your water meter - is it running even when no water is in use? (indicates a leak)",
        "Verify your water bill hasn't increased - that confirms an active leak",
        "Check your municipal water company website for outages in your area"
      ],
      shouldCall: "We can perform a water pressure test and diagnose the issue - usually $100-150 for diagnosis."
    },
    {
      id: "smell",
      label: "Bad smell from drains (sulfur/rotten egg)",
      severity: "low",
      tip: "Usually harmless bacteria, but indicates buildup that needs attention.",
      steps: [
        "Pour a cup of baking soda down the drain, followed by white vinegar",
        "Let it sit for 30 minutes, then flush with hot water",
        "Repeat monthly to prevent buildup and odors",
        "If only in one drain, remove and clean the trap underneath the sink"
      ],
      shouldCall: "If smell persists after DIY cleaning, we can professionally clean the drain line."
    }
  ]
}

const getSeverityColor = (severity: string) => {
  switch(severity) {
    case "critical": return "from-red-600 to-red-700"
    case "high": return "from-orange-600 to-orange-700"
    case "medium": return "from-yellow-600 to-yellow-700"
    default: return "from-blue-600 to-blue-700"
  }
}

const getSeverityBadge = (severity: string) => {
  switch(severity) {
    case "critical": return { icon: AlertTriangle, text: "EMERGENCY", color: "bg-red-500/20 border-red-500/50 text-red-300" }
    case "high": return { icon: AlertTriangle, text: "URGENT", color: "bg-orange-500/20 border-orange-500/50 text-orange-300" }
    case "medium": return { icon: Zap, text: "IMPORTANT", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" }
    default: return { icon: CheckCircle2, text: "ROUTINE", color: "bg-blue-500/20 border-blue-500/50 text-blue-300" }
  }
}

export default function Troubleshooter() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState("")
  const [selectedIssue, setSelectedIssue] = useState<any>(null)

  const handleLocation = (locId: string) => {
    setLocation(locId)
    setStep(2)
  }

  const handleIssue = (issue: any) => {
    setSelectedIssue(issue)
    setStep(3)
  }

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-2xl">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 sm:p-6 border-b border-slate-700/50">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <Wrench className="h-5 sm:h-6 w-5 sm:w-6 text-blue-400" />
          </div>
          Smart Diagnostic Assistant
        </h3>
        <p className="text-center text-xs sm:text-sm text-slate-400">Get instant guidance for your plumbing issues</p>
      </div>

      {/* Disclaimer */}
      <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-2 sm:pb-4">
        <p className="text-xs sm:text-sm text-slate-400 text-center">
          💡 <strong>Don't see your issue?</strong> {" "}
          <a href="#booking-form" className="text-blue-400 hover:text-blue-300 transition">Schedule a service call</a> or {" "}
          <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 transition">call 555-123-4567</a> and describe your problem to our experts.
        </p>
      </div>
      
      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Location Selection */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <p className="mb-4 sm:mb-6 text-center text-base sm:text-lg font-semibold text-slate-200">Where's the problem?</p>
              <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {LOCATIONS.map((loc) => (
                  <button 
                    key={loc.id} 
                    onClick={() => handleLocation(loc.id)} 
                    className="group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-600 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 text-left overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{loc.label.split(" ")[0]}</div>
                      <div className="font-semibold text-white text-xs sm:text-sm">{loc.label.split(" ").slice(1).join(" ")}</div>
                      <div className="text-xs text-slate-400 mt-0.5 sm:mt-1">{loc.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Issue Selection */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <p className="mb-4 sm:mb-6 text-center text-base sm:text-lg font-semibold text-slate-200">What seems to be the problem?</p>
              <div className="grid gap-2 sm:gap-3 mb-4 sm:mb-6">
                {ISSUES[location].map((issue) => {
                  const badge = getSeverityBadge(issue.severity)
                  const BadgeIcon = badge.icon
                  return (
                    <button 
                      key={issue.id} 
                      onClick={() => handleIssue(issue)} 
                      className="group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-600 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 text-left overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm mb-1">{issue.label}</div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${badge.color}`}>
                            <BadgeIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">{badge.text}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      </div>
                    </button>
                  )
                })}
              </div>
              <button onClick={() => setStep(1)} className="text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition">← Back</button>
            </motion.div>
          )}

          {/* STEP 3: Detailed Solution */}
          {step === 3 && selectedIssue && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              {/* Severity Banner */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border bg-gradient-to-r ${getSeverityColor(selectedIssue.severity)} border-opacity-50 bg-opacity-20">
                <div className={`inline-flex items-center gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold ${getSeverityBadge(selectedIssue.severity).color}`}>
                  {(() => {
                    const Icon = getSeverityBadge(selectedIssue.severity).icon
                    return <><Icon className="h-4 w-4" /> {getSeverityBadge(selectedIssue.severity).text}</>
                  })()}
                </div>
              </div>

              {/* Problem Summary */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-lg bg-slate-900/50 border border-slate-700/50">
                <p className="text-slate-300 text-sm"><strong>What's happening:</strong> {selectedIssue.tip}</p>
              </div>

              {/* Step-by-step guide */}
              <div className="mb-4 sm:mb-6">
                <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
                  What You Can Do Right Now:
                </h4>
                <ol className="space-y-2 sm:space-y-3">
                  {selectedIssue.steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-400">{idx + 1}</span>
                      </div>
                      <p className="text-slate-300 text-sm pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* When to call */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-300 text-xs sm:text-sm"><strong>Next step:</strong> {selectedIssue.shouldCall}</p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <a href="#booking-form" className="w-full group relative px-4 sm:px-6 py-3 sm:py-4 font-bold text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-600/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Wrench className="h-4 sm:h-5 w-4 sm:w-5" />
                    Schedule Expert Service
                  </span>
                </a>
                <button onClick={() => setStep(1)} className="w-full px-4 sm:px-6 py-3 sm:py-4 font-bold text-slate-300 rounded-lg border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 transition-all text-sm sm:text-base">
                  ← Diagnose Another Issue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}