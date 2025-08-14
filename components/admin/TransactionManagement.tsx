'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, Eye, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const mockTransactions = [
  {
    id: 'TX001',
    user: 'John Doe',
    type: 'DEPOSIT',
    amount: 5000,
    currency: 'USD',
    status: 'COMPLETED',
    timestamp: '2024-01-20 14:30:00',
    method: 'Bank Transfer',
  },
  {
    id: 'TX002',
    user: 'Jane Smith',
    type: 'WITHDRAWAL',
    amount: 2500,
    currency: 'USD',
    status: 'PENDING',
    timestamp: '2024-01-20 13:15:00',
    method: 'Crypto Wallet',
  },
  {
    id: 'TX003',
    user: 'Mike Johnson',
    type: 'TRADE',
    amount: 1000,
    currency: 'EUR',
    status: 'COMPLETED',
    timestamp: '2024-01-20 12:00:00',
    method: 'EUR/USD',
  },
  {
    id: 'TX004',
    user: 'Sarah Wilson',
    type: 'DEPOSIT',
    amount: 10000,
    currency: 'USD',
    status: 'FAILED',
    timestamp: '2024-01-20 11:30:00',
    method: 'Credit Card',
  },
]

export default function TransactionManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = mockTransactions.filter(tx =>
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.user.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'WITHDRAWAL':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'TRADE':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <Card className="glass-effect">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <CardTitle className="text-white">Transaction Management</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/60 font-medium py-3">Transaction ID</th>
                <th className="text-left text-white/60 font-medium py-3">User</th>
                <th className="text-left text-white/60 font-medium py-3">Type</th>
                <th className="text-left text-white/60 font-medium py-3">Amount</th>
                <th className="text-left text-white/60 font-medium py-3">Status</th>
                <th className="text-left text-white/60 font-medium py-3">Time</th>
                <th className="text-left text-white/60 font-medium py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4">
                    <span className="text-white font-mono">{transaction.id}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-white">{transaction.user}</span>
                  </td>
                  <td className="py-4">
                    <Badge className={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <span className="text-white font-mono">
                      {transaction.amount.toLocaleString()} {transaction.currency}
                    </span>
                  </td>
                  <td className="py-4">
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <span className="text-white/60">{transaction.timestamp}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {transaction.status === 'PENDING' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}