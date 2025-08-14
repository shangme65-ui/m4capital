'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Mail, Phone, MapPin, Twitter, Facebook, LinkedIn, Instagram } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    trading: [
      { name: 'Forex Trading', href: '/trading/forex' },
      { name: 'Crypto Trading', href: '/trading/crypto' },
      { name: 'Trading Tools', href: '/trading/tools' },
      { name: 'Market Analysis', href: '/trading/analysis' },
    ],
    education: [
      { name: 'Trading Basics', href: '/education/basics' },
      { name: 'Advanced Strategies', href: '/education/advanced' },
      { name: 'Risk Management', href: '/education/risk' },
      { name: 'Market News', href: '/education/news' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Risk Disclosure', href: '/risk-disclosure' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'LinkedIn', href: '#', icon: LinkedIn },
    { name: 'Instagram', href: '#', icon: Instagram },
  ]

  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center"
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gold-400 bg-clip-text text-transparent">
                  M4Capital
                </span>
              </Link>
              <p className="text-white/60 mb-6 max-w-md">
                Your premier destination for forex and cryptocurrency trading. Experience the future of financial markets with our advanced platform and expert insights.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-white/60">
                  <Mail className="w-4 h-4" />
                  <span>support@m4capital.com</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 M4Capital. All rights reserved. Trading involves risk.
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}