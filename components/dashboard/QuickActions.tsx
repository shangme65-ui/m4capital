'use client'

import { motion } from 'framer-motion'
import { Plus, Minus, BarChart3, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const actions = [
  {
    title: 'Buy Assets',
    description: 'Purchase forex pairs or crypto',
    icon: Plus,
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
  },
  {
    title: 'Sell Assets',
    description: 'Close positions or sell holdings',
    icon: Minus,
    color: 'from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700',
  },
  {
    title: 'View Analytics',
    description: 'Detailed performance analysis',
    icon: BarChart3,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
  },
  {
    title: 'Account Settings',
    description: 'Manage your account preferences',
    icon: Settings,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
  },
]

export default function QuickActions() {
  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start h-auto p-4 bg-gradient-to-r ${action.color} ${action.hoverColor} text-white transition-all duration-300 hover:scale-105`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="mr-3"
              >
                <action.icon className="w-5 h-5" />
              </motion.div>
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-80">{action.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}