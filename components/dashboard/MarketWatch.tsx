'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/utils'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
}

const initialMarketData: MarketData[] = [
  { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0543, change: 0.15, volume: 1234567 },
  { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: 1.2789, change: -0.23, volume: 987654 },
  { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: 149.85, change: 0.45, volume: 2345678 },
  { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', price: 0.6678, change: -0.12, volume: 654321 },
  { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', price: 0.8765, change: 0.08, volume: 876543 },
]

export default function MarketWatch() {
  const [marketData, setMarketData] = useState<MarketData[]>(initialMarketData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    
    // Simulate API call with realistic price updates
    setTimeout(() => {
      setMarketData(prevData =>
        prevData.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 0.01,
          change: (Math.random() - 0.5) * 2,
        }))
      )
      setIsRefreshing(false)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 10000) // Auto-refresh every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Market Watch</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
            className="text-white/60 hover:text-white"
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketData.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              <div>
                <div className="text-white font-semibold">{item.symbol}</div>
                <div className="text-xs text-white/60 truncate max-w-32">
                  {item.name}
                </div>
              </div>
              
              <div className="text-right">
                <motion.div
                  key={item.price}
                  initial={{ scale: 1.1, color: '#f59e0b' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  transition={{ duration: 0.3 }}
                  className="text-white font-mono"
                >
                  {formatNumber(item.price, 4)}
                </motion.div>
                <div className="flex items-center justify-end text-sm">
                  {item.change > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                  )}
                  <span
                    className={
                      item.change > 0 ? 'text-green-400' : 'text-red-400'
                    }
                  >
                    {item.change > 0 ? '+' : ''}{formatNumber(item.change, 2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
            View All Markets
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}