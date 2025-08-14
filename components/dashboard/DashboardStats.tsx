'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const stats = [
  {
    title: 'Total Balance',
    value: 41190,
    change: 2.5,
    icon: DollarSign,
    prefix: '$',
  },
  {
    title: 'Total Profit',
    value: 3420,
    change: 12.3,
    icon: TrendingUp,
    prefix: '$',
  },
  {
    title: 'Active Trades',
    value: 8,
    change: 14.2,
    icon: Activity,
    prefix: '',
  },
  {
    title: 'Win Rate',
    value: 72.5,
    change: 5.1,
    icon: TrendingUp,
    prefix: '',
    suffix: '%',
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="glass-effect hover:bg-white/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">
                {stat.title}
              </CardTitle>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg flex items-center justify-center"
              >
                <stat.icon className="w-4 h-4 text-white" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-2xl font-bold text-white mb-1"
              >
                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
              </motion.div>
              <div className="flex items-center text-sm">
                {stat.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                )}
                <span
                  className={
                    stat.change > 0 ? 'text-green-400' : 'text-red-400'
                  }
                >
                  {formatPercentage(Math.abs(stat.change))}
                </span>
                <span className="text-white/60 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}