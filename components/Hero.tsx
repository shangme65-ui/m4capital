'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
import { Button } from './ui/button'
import TradingBackground from './3d/TradingBackground'

const heroSlides = [
  {
    title: "Trade the Future of Finance",
    subtitle: "Advanced forex and cryptocurrency trading platform",
    description: "Experience lightning-fast execution, advanced charting tools, and institutional-grade security.",
    cta: "Start Trading",
    background: "bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900"
  },
  {
    title: "AI-Powered Trading Insights",
    subtitle: "Make smarter decisions with artificial intelligence",
    description: "Leverage cutting-edge AI algorithms to identify profitable trading opportunities in real-time.",
    cta: "Explore AI Tools",
    background: "bg-gradient-to-r from-green-900 via-teal-900 to-blue-900"
  },
  {
    title: "Institutional-Grade Security",
    subtitle: "Your assets, our priority",
    description: "Multi-layer security architecture with cold storage, 2FA, and insurance coverage.",
    cta: "Learn More",
    background: "bg-gradient-to-r from-purple-900 via-pink-900 to-red-900"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Real-time market data and analysis"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Multi-layer protection for your assets"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds"
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access worldwide trading opportunities"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <TradingBackground />
      
      {/* Animated Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={`absolute inset-0 ${heroSlides[currentSlide].background}`}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={index === heroSlides[currentSlide].title.split(' ').length - 1 ? 
                      "bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent" : 
                      ""
                    }
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.p
                className="text-lg text-white/60 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link href="/auth/signup">
                  <Button size="lg" variant="gradient" className="group">
                    {heroSlides[currentSlide].cta}
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/trading">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mb-16">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gold-400 w-8' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center group hover:bg-white/20 transition-all duration-300"
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-gold-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-40"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-50"
        animate={{
          y: [0, -25, 0],
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </section>
  )
}