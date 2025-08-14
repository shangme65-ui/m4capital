'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    number: 250000,
    suffix: '+',
    label: 'Active Traders',
    description: 'Join our growing community'
  },
  {
    number: 50,
    suffix: 'B+',
    label: 'Trading Volume',
    description: 'Monthly trading volume'
  },
  {
    number: 99.9,
    suffix: '%',
    label: 'Uptime',
    description: 'Reliable platform performance'
  },
  {
    number: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Always here to help'
  }
]

function AnimatedNumber({ number, suffix, duration = 2000 }: { number: number, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        setCount(Math.floor(progress * number))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, number, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Traders Worldwide
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Join hundreds of thousands of traders who trust M4Capital for their 
            trading needs. Our platform processes billions in trading volume every month.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center group"
            >
              <div className="glass-effect p-8 rounded-xl hover:bg-white/20 transition-all duration-300">
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300"
                >
                  <AnimatedNumber number={stat.number} suffix={stat.suffix} />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {stat.label}
                </h3>
                
                <p className="text-white/60">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional visual elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="flex justify-center items-center space-x-8 opacity-30">
            {['TradingView', 'MetaTrader', 'cTrader', 'Bloomberg'].map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-white font-semibold text-lg"
              >
                {platform}
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/40 mt-4">
            Integrates with leading trading platforms
          </p>
        </motion.div>
      </div>
    </section>
  )
}