import Header from "@/components/Header"
import Troubleshooter from "@/components/Troubleshooter"
import ServiceRequestForm from "@/components/ServiceRequestForm"
import TestimonialsSection from "@/components/TestimonialsSection"
import { Shield, Clock, Wrench, Zap, CheckCircle2, Star, TrendingUp, Award, Users } from "lucide-react"

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Header />
      
      <main>
        {/* PREMIUM HERO SECTION */}
        <section className="relative overflow-hidden px-4 py-32 sm:py-48">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 px-4 py-2 border border-blue-500/50 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-semibold text-blue-200">Johnson City • Kingsport • Bristol • Regional Excellence</span>
              </div>
              
              <h1 className="mb-6 text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]">
                The Future of<br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-pulse">Premium Plumbing</span>
              </h1>
              
              <p className="mb-12 text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                The Tri-Cities' distributed plumbing authority. Engineered excellence across Johnson City, Kingsport, and Bristol—local expertise, premium results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a href="#booking-form" className="w-full sm:w-auto group relative px-10 py-5 font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-400 to-red-600 blur-lg transition-all duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2 text-lg">
                    <Wrench className="h-5 w-5" />
                    Schedule Premium Service
                  </span>
                </a>
                <a href="#troubleshoot" className="w-full sm:w-auto px-10 py-5 font-bold text-slate-100 rounded-xl border-2 border-slate-600 hover:border-blue-500/70 hover:bg-slate-800/50 hover:shadow-lg transition-all duration-300 text-lg">
                  Get Smart Diagnostics
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="h-5 w-5 text-blue-400" />
                  <span>Certified Professional</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>4.9★ Rating (2,500+ reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>Trusted by 50,000+ families</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM TRUST SIGNALS */}
        <section className="px-4 py-24 border-y border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Built on Five Pillars of Excellence</h2>
              <p className="text-slate-400">Why industry leaders choose Salts Brothers</p>
            </div>
            
            <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: Clock, title: "15-Min Response", desc: "Distributed dispatch network" },
                { icon: Shield, title: "Regional Authority", desc: "Deep local infrastructure knowledge" },
                { icon: Wrench, title: "Expert Technicians", desc: "Average 12+ years experience" },
                { icon: TrendingUp, title: "Transparent Pricing", desc: "Zero hidden fees, guaranteed" },
                { icon: Award, title: "5-Year Warranty", desc: "All service backed" }
              ].map((item, i) => (
                <div key={i} className="group relative p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="mb-4 inline-block p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 group-hover:bg-blue-500/20 transition-colors">
                      <item.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1 text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM STATS */}
        <section className="px-4 py-20 bg-gradient-to-r from-blue-600/10 via-transparent to-red-600/10 border-y border-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { stat: "2,500+", label: "Flawless Jobs", sub: "99.8% satisfaction rate" },
                { stat: "9+", label: "Years Excellence", sub: "Continuous growth" },
                { stat: "4.9★", label: "Certified Rating", sub: "Industry benchmark" },
                { stat: "50K+", label: "Trusted Families", sub: "Growing daily" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-lg border border-slate-800/50 hover:border-blue-500/30 transition-colors">
                  <div className="text-4xl font-black text-blue-400 mb-2">{item.stat}</div>
                  <div className="font-bold text-white mb-1">{item.label}</div>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <TestimonialsSection />

        {/* TROUBLESHOOTER SECTION */}
        <section id="troubleshoot" className="px-4 py-24 border-y border-slate-800/50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Intelligent Diagnostics</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our proprietary AI system identifies plumbing issues with surgical precision. Save time, money, and prevent emergency damage.
              </p>
            </div>
            <Troubleshooter />
          </div>
        </section>

        {/* BOOKING SECTION */}
        <section id="booking-form" className="relative overflow-hidden px-4 py-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Ready for Excellence?</h2>
              <p className="text-slate-400">Join thousands who've discovered the Salts Brothers difference</p>
            </div>
            <ServiceRequestForm />
          </div>
        </section>
      </main>

      {/* PREMIUM FOOTER */}
      <footer className="border-t border-slate-800/50 bg-gradient-to-b from-slate-950/80 to-slate-950 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 sm:grid-cols-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-6 w-6 text-blue-400" />
                <h3 className="font-bold text-white text-lg">Salts Brothers</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Serving Johnson City, Kingsport, and Bristol since 2015. Regional infrastructure expertise meets premium service excellence and transparent operations.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Quick Access</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#booking-form" className="hover:text-blue-400 transition">Schedule Service</a></li>
                <li><a href="#troubleshoot" className="hover:text-blue-400 transition">Diagnostics</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Emergency Hotline</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition">Emergency Repair</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Installation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">24/7 Support</h3>
              <p className="text-sm text-slate-400 mb-1">
                <a href="tel:+15551234567" className="hover:text-blue-400 transition font-semibold">423-946-9449</a>
              </p>
              <p className="text-xs text-slate-500 mb-2">Serving Johnson City, Kingsport, Bristol</p>
              <p className="text-xs text-slate-500">Licensed • Insured • Bonded</p>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Salts Brothers Plumbing. Premier service excellence guaranteed.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
                <a href="#" className="hover:text-slate-300 transition">Careers</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}