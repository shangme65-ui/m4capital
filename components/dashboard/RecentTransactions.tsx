'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAWAL'
  symbol: string
  amount: number
  price: number
  total: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  timestamp: Date
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'BUY',
    symbol: 'EUR/USD',
    amount: 1000,
    price: 1.0543,
    total: 1054.30,
    status: 'COMPLETED',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: '2',
    type: 'SELL',
    symbol: 'GBP/USD',
    amount: 500,
    price: 1.2789,
    total: 639.45,
    status: 'COMPLETED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '3',
    type: 'DEPOSIT',
    symbol: 'USD',
    amount: 5000,
    price: 1,
    total: 5000,
    status: 'PENDING',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
  },
  {
    id: '4',
    type: 'BUY',
    symbol: 'USD/JPY',
    amount: 750,
    price: 149.85,
    total: 112387.50,
    status: 'FAILED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
  },
  {
    id: '5',
    type: 'WITHDRAWAL',
    symbol: 'USD',
    amount: 2000,
    price: 1,
    total: 2000,
    status: 'COMPLETED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  },
]

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'FAILED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BUY':
      case 'DEPOSIT':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />
      case 'SELL':
      case 'WITHDRAWAL':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />
      default:
        return <ArrowUpRight className="w-4 h-4 text-gray-400" />
    }
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <Card className="glass-effect h-full">
      <CardHeader>
        <CardTitle className="text-white">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
                >
                  {getTypeIcon(transaction.type)}
                </motion.div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      {transaction.type} {transaction.symbol}
                    </span>
                    <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-white/60">
                    {transaction.type === 'DEPOSIT' || transaction.type === 'WITHDRAWAL' 
                      ? formatCurrency(transaction.amount)
                      : `${formatNumber(transaction.amount)} @ ${formatNumber(transaction.price, 5)}`
                    }
                  </div>
                  <div className="text-xs text-white/40">
                    {formatRelativeTime(transaction.timestamp)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(transaction.status)}
                  <span
                    className={`font-semibold ${
                      transaction.type === 'BUY' || transaction.type === 'DEPOSIT'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {transaction.type === 'BUY' || transaction.type === 'DEPOSIT' ? '+' : '-'}
                    {transaction.type === 'DEPOSIT' || transaction.type === 'WITHDRAWAL'
                      ? formatCurrency(transaction.total)
                      : formatNumber(transaction.total, 2)
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4"
        >
          <button className="w-full text-center text-gold-400 hover:text-gold-300 transition-colors py-2 text-sm font-medium">
            View All Transactions
          </button>
        </motion.div>
      </CardContent>
    </Card>
  )
}