'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, TrendingUp, Globe, Brain, Lock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Advanced machine learning algorithms analyze market patterns and provide intelligent trading insights in real-time.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Execution',
    description: 'Execute trades in milliseconds with our high-performance infrastructure and direct market access.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Multi-layer security architecture with cold storage, 2FA, and insurance coverage for your peace of mind.',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    icon: Globe,
    title: 'Global Markets Access',
    description: 'Trade forex, cryptocurrencies, and commodities across all major global markets from a single platform.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Advanced Charting',
    description: 'Professional-grade charting tools with 100+ technical indicators and drawing tools for comprehensive analysis.',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Lock,
    title: 'Institutional Grade',
    description: 'Built for professionals with enterprise-level features, API access, and dedicated support.',
    gradient: 'from-red-500 to-pink-500'
  }
]

export default function FeaturesSection() {
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
            Why Choose{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              M4Capital
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Experience the next generation of trading with cutting-edge technology, 
            unmatched security, and professional-grade tools designed for serious traders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-effect p-8 rounded-xl h-full hover:bg-white/20 transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}