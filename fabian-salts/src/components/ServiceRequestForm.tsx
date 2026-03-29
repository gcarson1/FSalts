"use client"

import { useState } from "react"
import { submitServiceRequest } from "@/app/actions"
import { motion, AnimatePresence } from "framer-motion"

export default function ServiceRequestForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitServiceRequest(formData)
    
    setFeedback(result)
    setIsSubmitting(false)
    if (result.success) setStep(3) // Success screen
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl" id="booking-form">
      <h2 className="mb-6 text-2xl font-bold text-slate-100">Request Service</h2>
      
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* STEP 1: Contact Info */}
          {step === 1 && (
            <motion.div key="form-step-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Full Name</label>
                  <input required name="name" type="text" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Service Address</label>
                  <input required name="address" type="text" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <button onClick={handleNext} className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-700">Next Step →</button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Service Details */}
          {step === 2 && (
            <motion.div key="form-step-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">What needs fixing?</label>
                  <select name="serviceType" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none">
                    <option value="leak">Leak Repair</option>
                    <option value="clog">Drain Cleaning</option>
                    <option value="water-heater">Water Heater</option>
                    <option value="installation">New Installation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Urgency Level</label>
                  <select name="urgency" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none">
                    <option value="emergency">🚨 Emergency (Need someone now)</option>
                    <option value="soon">High (Next 24 hours)</option>
                    <option value="routine">Routine (Whenever available)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-300">Preferred Date/Time</label>
                  <input name="preferredDate" type="datetime-local" className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 focus:border-blue-500 focus:outline-none" />
                </div>
                
                {feedback && !feedback.success && (
                  <div className="text-sm font-medium text-red-500">{feedback.message}</div>
                )}

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 rounded-md border border-slate-600 bg-transparent px-4 py-3 font-bold text-slate-300 transition-colors hover:bg-slate-700">Back</button>
                  <button type="submit" disabled={isSubmitting} className="w-2/3 rounded-md bg-red-600 px-4 py-3 font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Request Service"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Success State */}
          {step === 3 && (
            <motion.div key="form-step-3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-100">Request Sent Successfully!</h3>
              <p className="text-slate-300">{feedback?.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}