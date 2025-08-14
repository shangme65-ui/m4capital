'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

const portfolioData = [
  { name: 'EUR/USD', value: 10100, change: 1.0, color: '#0ea5e9' },
  { name: 'GBP/USD', value: 5100, change: 2.0, color: '#f59e0b' },
  { name: 'USD/JPY', value: 7920, change: -1.0, color: '#10b981' },
  { name: 'AUD/USD', value: 3090, change: 3.0, color: '#8b5cf6' },
  { name: 'USD/CHF', value: 5940, change: -1.0, color: '#ef4444' },
  { name: 'USD/CAD', value: 4080, change: 2.0, color: '#f97316' },
]

export default function PortfolioOverview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    const total = portfolioData.reduce((sum, item) => sum + item.value, 0)
    setTotalValue(total)
  }, [])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Portfolio Overview
          <span className="text-lg font-normal text-gold-400">
            {formatCurrency(totalValue)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={activeIndex === index ? '#ffffff' : 'transparent'}
                      strokeWidth={activeIndex === index ? 2 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Value']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {portfolioData.map((asset, index) => (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="text-white font-medium">{asset.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {formatCurrency(asset.value)}
                  </div>
                  <div
                    className={`text-sm ${
                      asset.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {asset.change > 0 ? '+' : ''}{asset.change}%
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <Button variant="gradient" className="w-full">
                Rebalance Portfolio
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}