"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronDown } from "lucide-react"

export default function TestimonialsSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const testimonials = [
    {
      text: "The team arrived within 45 minutes and had us back to normal within the hour. Professional, courteous, and transparent pricing.",
      author: "Sarah Mitchell",
      role: "Homeowner, Johnson City",
      rating: 5
    },
    {
      text: "We've contracted Salts Brothers for our entire commercial property portfolio. Zero downtime, premium service quality.",
      author: "James Richardson",
      role: "Property Manager, Kingsport",
      rating: 5
    },
    {
      text: "The diagnostic tool alone saved us $800 by catching the issue early. Their expertise is unmatched.",
      author: "Michael Chen",
      role: "Business Owner, Bristol",
      rating: 5
    }
  ]

  return (
    <section className="px-4 py-24">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Trusted by Industry Leaders</h2>
          <p className="text-slate-400 text-lg">See why our clients choose Salts Brothers Plumbing</p>
        </div>

        <div className="space-y-0">
          {/* First testimonial - always visible */}
          <motion.div
            className="group relative p-8 rounded-t-xl border border-b-0 border-slate-800 hover:border-blue-500/50 bg-slate-900/50 transition-all duration-300 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="mb-4 flex gap-1">
              {[...Array(testimonials[0].rating)].map((_, j) => (
                <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-200 mb-6 text-lg leading-relaxed italic">"{testimonials[0].text}"</p>
            <div className="mb-4">
              <p className="font-bold text-white">{testimonials[0].author}</p>
              <p className="text-sm text-slate-400">{testimonials[0].role}</p>
            </div>
            
            {/* Chevron indicator */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-6 w-6 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Expandable testimonials */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="border-t border-slate-800 space-y-0 bg-slate-900/30">
                  {testimonials.slice(1).map((testimonial, i) => (
                    <motion.div
                      key={i + 1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i + 1) * 0.1 }}
                      className={`group relative p-8 border-l border-r border-slate-800 hover:border-blue-500/50 transition-all duration-300 ${
                        i === testimonials.length - 2 ? "rounded-b-xl border-b" : ""
                      }`}
                    >
                      <div className="mb-4 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-200 mb-6 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                      <div>
                        <p className="font-bold text-white">{testimonial.author}</p>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click hint */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-3 text-blue-400 text-sm font-medium cursor-pointer hover:text-blue-300 transition"
              onClick={() => setIsExpanded(true)}
            >
              ↓ View {testimonials.length - 1} more reviews
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
