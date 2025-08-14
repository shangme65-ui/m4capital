'use client'

import { motion } from 'framer-motion'
import { Users, DollarSign, Activity, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

const adminStats = [
  {
    title: 'Total Users',
    value: 2547,
    change: 12.5,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Trading Volume (24h)',
    value: 89500000,
    change: 8.2,
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    prefix: '$',
  },
  {
    title: 'Active Trades',
    value: 1247,
    change: -2.1,
    icon: Activity,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Pending Issues',
    value: 23,
    change: -15.3,
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600',
  },
]

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {adminStats.map((stat, index) => (
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
                className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-4 h-4 text-white" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.prefix}{stat.title === 'Trading Volume (24h)' ? formatCurrency(stat.value).replace('$', '') : stat.value.toLocaleString()}
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={
                    stat.change > 0 ? 'text-green-400' : 'text-red-400'
                  }
                >
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </span>
                <span className="text-white/60 ml-1">from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}