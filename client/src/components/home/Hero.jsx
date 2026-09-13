import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0.5, y: 18 },
  show: { opacity: 0.8, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const heroImage = "https://upload.wikimedia.org/wikipedia/commons/e/e6/IITGN.jpg"

  return (
    <section className="relative overflow-hidden bg-[#0A1420]">
      {/* Background Image Container with Reduced Opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="IIT Gandhinagar Campus"
          className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-110"
        />
        {/* Dark radial and linear gradients overlay for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1420]/90 via-[#0A1420]/70 to-[#0A1420]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1420] via-transparent to-[#0A1420]/60" />
      </div>

      {/* Decorative Wave Overlay */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-[0.25] z-10 pointer-events-none"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C 220 40, 420 200, 660 110 S 1100 20, 1440 100 L1440 220 L0 220 Z"
          fill="url(#hero-wave)"
        />
        <defs>
          <linearGradient id="hero-wave" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#2DD4BF" />
            <stop offset="1" stopColor="#F2A93B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-32 sm:pt-36 sm:pb-40"
      >
        <motion.p variants={item} className="text-amber-soft text-sm font-medium mb-5 drop-shadow-md">
          IIT Gandhinagar
        </motion.p>
        <motion.h1
          variants={item}
          className="text-paper text-4xl sm:text-6xl font-semibold tracking-tight max-w-[16ch] leading-[1.08] drop-shadow-lg"
        >
          Water &amp; Climate Lab
        </motion.h1>
        <motion.p variants={item} className="mt-5 text-paper/90 text-lg max-w-[46ch] drop-shadow-md">
          We study droughts, floods and the changing water cycle across India and
          South Asia -- turning satellite data and hydrologic models into tools
          decision-makers can act on.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/research-areas"
            className="inline-flex items-center gap-2 rounded-full bg-teal text-bgdark px-6 py-3 text-sm font-medium hover:bg-teal-soft transition-colors shadow-lg"
          >
            Research Areas
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-paper px-6 py-3 text-sm font-medium hover:bg-white/20 transition-colors shadow-lg"
          >
            <Mail size={16} />
            Enquiry
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}