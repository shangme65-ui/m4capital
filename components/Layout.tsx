'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
  showNavbar?: boolean
  showFooter?: boolean
}

export default function Layout({ children, showNavbar = true, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-trading-pattern opacity-10" />
      <div className="relative z-10">
        <AnimatePresence>
          {showNavbar && <Navbar />}
        </AnimatePresence>
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {children}
        </motion.main>
        
        <AnimatePresence>
          {showFooter && <Footer />}
        </AnimatePresence>
      </div>
    </div>
  )
}