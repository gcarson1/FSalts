"use client"

import { useState } from "react"
import { submitServiceRequest } from "@/app/actions"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight, Wrench } from "lucide-react"

export default function ServiceRequestForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    serviceType: "leak",
    urgency: "emergency",
    preferredDate: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address) {
      setFeedback({ success: false, message: "Please complete all contact information to proceed." })
      return
    }
    
    setFeedback(null)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address || !formData.serviceType || !formData.urgency) {
      setFeedback({ success: false, message: "Please fill out all required fields." })
      return
    }
    
    setIsSubmitting(true)
    setFeedback(null)

    const payload = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value)
    })

    const result = await submitServiceRequest(payload)
    
    setFeedback(result)
    setIsSubmitting(false)
    if (result.success) setStep(3)
  }

  return (
    <div className="mx-auto w-full max-w-2xl" id="booking-form">
      <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <Wrench className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Schedule Your Service</h2>
              <p className="text-sm text-slate-400 mt-1">Professional plumbing in 3 easy steps</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex-1">
                <div className={`h-1 rounded-full transition-all ${num <= step ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-slate-700'}`}></div>
                {num === step && (
                  <p className="text-xs text-blue-400 font-bold mt-2">
                    {num === 1 && "Your Information"}
                    {num === 2 && "Service Details"}
                    {num === 3 && "Confirmed"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {feedback && !feedback.success && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-300 text-sm font-medium">
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* STEP 1: Contact Info */}
            {step === 1 && (
              <motion.div key="form-step-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Full Name *</label>
                    <input 
                      required 
                      name="name" 
                      type="text" 
                      placeholder="John Smith"
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Phone Number *</label>
                    <input 
                      required 
                      name="phone" 
                      type="tel" 
                      placeholder="(555) 123-4567"
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Service Address *</label>
                    <input 
                      required 
                      name="address" 
                      type="text" 
                      placeholder="123 Main Street, City, State ZIP"
                      value={formData.address} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                    />
                  </div>
                  <button type="button" onClick={handleNext} className="mt-8 w-full group relative px-6 py-3 font-bold text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      Continue <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Service Details */}
            {step === 2 && (
              <motion.div key="form-step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">What Service Do You Need? *</label>
                    <select 
                      name="serviceType" 
                      value={formData.serviceType} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="leak">🌊 Leak Repair & Detection</option>
                      <option value="clog">🚰 Drain Cleaning & Unclogging</option>
                      <option value="water-heater">🔥 Water Heater Service</option>
                      <option value="installation">⚙️ New Installation</option>
                      <option value="other">📋 Other Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Priority Level *</label>
                    <select 
                      name="urgency" 
                      value={formData.urgency} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                      <option value="emergency">🚨 EMERGENCY - Immediate (Now)</option>
                      <option value="soon">⚡ HIGH - Fast (Next 24 hrs)</option>
                      <option value="routine">📅 ROUTINE - Flexible scheduling</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">Preferred Date & Time</label>
                    <input 
                      name="preferredDate" 
                      type="datetime-local" 
                      value={formData.preferredDate} 
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                    />
                    <p className="text-xs text-slate-400 mt-1">Optional - we'll fit you in ASAP if not specified</p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 px-4 py-3 font-bold text-slate-300 rounded-lg border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 transition-all">
                      Back
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex-2 group relative px-6 py-3 font-bold text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-600/50 disabled:opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300 disabled:from-red-700 disabled:to-red-800"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? "Processing..." : "Confirm Request"}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success State */}
            {step === 3 && (
              <motion.div key="form-step-3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-400" />
                </motion.div>
                <h3 className="mb-3 text-2xl font-bold text-white">Request Confirmed!</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{feedback?.message}</p>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 mb-6">
                  <p className="text-sm text-blue-300">
                    <strong>Next step:</strong> A technician will contact you shortly at {formData.phone}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setStep(1)
                    setFormData({ name: "", phone: "", address: "", serviceType: "leak", urgency: "emergency", preferredDate: "" })
                    setFeedback(null)
                  }}
                  className="px-6 py-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition"
                >
                  ← Request Another Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}