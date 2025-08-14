'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Generate realistic trading data
const generateTradingData = (days: number) => {
  const data = []
  let basePrice = 1.0543
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Simulate price movement
    const change = (Math.random() - 0.5) * 0.02
    basePrice += change
    
    data.push({
      date: date.toISOString().split('T')[0],
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: Number(basePrice.toFixed(5)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      high: Number((basePrice + Math.random() * 0.01).toFixed(5)),
      low: Number((basePrice - Math.random() * 0.01).toFixed(5)),
    })
  }
  
  return data
}

export default function TradingChart() {
  const [timeframe, setTimeframe] = useState('1D')
  const [chartData, setChartData] = useState(generateTradingData(30))
  const [selectedPair, setSelectedPair] = useState('EUR/USD')

  const timeframes = ['1H', '4H', '1D', '1W', '1M']
  const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD']

  useEffect(() => {
    const days = timeframe === '1H' ? 1 : timeframe === '4H' ? 7 : timeframe === '1D' ? 30 : timeframe === '1W' ? 90 : 365
    setChartData(generateTradingData(days))
  }, [timeframe, selectedPair])

  const currentPrice = chartData[chartData.length - 1]?.price || 0
  const previousPrice = chartData[chartData.length - 2]?.price || 0
  const priceChange = currentPrice - previousPrice
  const percentChange = (priceChange / previousPrice) * 100

  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-white flex items-center space-x-2">
              <span>{selectedPair}</span>
              <motion.span
                key={currentPrice}
                initial={{ scale: 1.1, color: '#f59e0b' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.3 }}
                className="font-mono"
              >
                {currentPrice.toFixed(5)}
              </motion.span>
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm">
              <span
                className={
                  priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }
              >
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(5)} ({percentChange.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {pairs.map((pair) => (
              <Button
                key={pair}
                variant={selectedPair === pair ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPair(pair)}
                className="text-xs"
              >
                {pair}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mb-4">
          <TabsList className="grid w-full grid-cols-5 bg-white/10">
            {timeframes.map((tf) => (
              <TabsTrigger key={tf} value={tf} className="text-white data-[state=active]:bg-gold-500">
                {tf}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                }}
                labelStyle={{ color: '#f59e0b' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="trading" className="w-full">
              BUY {selectedPair}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full danger-button">
              SELL {selectedPair}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}