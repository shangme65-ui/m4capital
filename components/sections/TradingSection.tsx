'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Monitor, Smartphone, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TradingSection() {
  const [activeTab, setActiveTab] = useState('desktop')

  const platforms = [
    {
      id: 'desktop',
      name: 'Desktop Platform',
      icon: Monitor,
      description: 'Full-featured desktop application with advanced charting and analysis tools',
      features: ['Advanced Charting', 'Real-time Data', 'Expert Advisors', 'Risk Management']
    },
    {
      id: 'web',
      name: 'Web Platform',
      icon: Globe,
      description: 'Access your account from any browser with our responsive web platform',
      features: ['Browser-based', 'Cross-platform', 'Auto-sync', 'Mobile Responsive']
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      icon: Smartphone,
      description: 'Trade on the go with our feature-rich mobile application',
      features: ['Touch Trading', 'Push Notifications', 'Biometric Login', 'Offline Charts']
    }
  ]

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
            Trade Anywhere,{' '}
            <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              Anytime
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Access global markets through our suite of trading platforms designed for 
            desktop, web, and mobile. Start trading in minutes with our intuitive interface.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="gradient" className="group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-8">
            {platforms.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className="flex items-center space-x-2 text-white data-[state=active]:bg-gold-500"
              >
                <platform.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{platform.name}</span>
                <span className="sm:hidden">{platform.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {platforms.map((platform, index) => (
            <TabsContent key={platform.id} value={platform.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center space-x-4 mb-6"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center`}>
                      <platform.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {platform.name}
                    </h3>
                  </motion.div>
                  
                  <p className="text-white/60 text-lg mb-8">
                    {platform.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {platform.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + featureIndex * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-gold-400 rounded-full" />
                        <span className="text-white/80">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button variant="gradient" size="lg">
                      Download Now
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      Learn More
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl backdrop-blur-sm border border-white/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <platform.icon className="w-24 h-24 text-gold-400 mx-auto mb-4 opacity-50" />
                      <p className="text-white/60">
                        {platform.name} Preview
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gold-400 rounded-full opacity-60"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-40"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}