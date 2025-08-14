'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Professional Trader',
    company: 'Quantum Capital',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c2bb?w=100&h=100&fit=crop&crop=face',
    content: "M4Capital has revolutionized my trading experience. The AI-powered insights and lightning-fast execution have significantly improved my trading performance. It's the most advanced platform I've ever used.",
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Forex Analyst',
    company: 'Global Markets Inc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: "The analytical tools and real-time data feeds are exceptional. M4Capital provides everything I need to make informed trading decisions. The platform's reliability is unmatched in the industry.",
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Watson',
    role: 'Crypto Trader',
    company: 'BlockChain Ventures',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: "As someone who trades both forex and crypto, having everything in one platform is incredible. The security features give me peace of mind, and the mobile app keeps me connected to the markets 24/7.",
    rating: 5
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Portfolio Manager',
    company: 'Stellar Investments',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: "M4Capital's institutional-grade features and API access have streamlined our trading operations. The platform scales beautifully with our growing trading volume and team size.",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Traders Say
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what professional traders 
            and institutions are saying about M4Capital.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-effect p-8 md:p-12 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gold-400"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center"
                    >
                      <Quote className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center md:justify-start mb-4"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-gold-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed italic"
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.blockquote>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="text-white font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gold-400 font-medium">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-white/60">
                      {testimonials[currentIndex].company}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </motion.div>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-gold-400 w-8' : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}