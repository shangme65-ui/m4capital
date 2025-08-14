'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Server, Database, Wifi, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const systemMetrics = [
  {
    name: 'API Server',
    icon: Server,
    status: 'HEALTHY',
    uptime: 99.9,
    responseTime: 120,
    description: 'Main trading API server',
  },
  {
    name: 'Database',
    icon: Database,
    status: 'HEALTHY',
    uptime: 99.8,
    responseTime: 45,
    description: 'Primary PostgreSQL database',
  },
  {
    name: 'Market Data Feed',
    icon: Wifi,
    status: 'WARNING',
    uptime: 98.5,
    responseTime: 200,
    description: 'Real-time market data connection',
  },
  {
    name: 'Security System',
    icon: Shield,
    status: 'HEALTHY',
    uptime: 100.0,
    responseTime: 30,
    description: 'Authentication and security services',
  },
]

export default function SystemHealth() {
  const [refreshTime, setRefreshTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date())
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return 'text-green-400'
      case 'WARNING':
        return 'text-yellow-400'
      case 'ERROR':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'WARNING':
      case 'ERROR':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">System Health Overview</CardTitle>
            <span className="text-sm text-white/60">
              Last updated: {refreshTime.toLocaleTimeString()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{metric.name}</h3>
                      <p className="text-sm text-white/60">{metric.description}</p>
                    </div>
                  </div>
                  {getStatusIcon(metric.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Uptime</span>
                    <span className="text-sm font-mono text-white">{metric.uptime}%</span>
                  </div>
                  <Progress value={metric.uptime} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Response Time</span>
                    <span className="text-sm font-mono text-white">{metric.responseTime}ms</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Status</span>
                    <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <div>
                  <p className="text-white text-sm">Market data feed latency increased</p>
                  <p className="text-white/60 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-white text-sm">Database backup completed successfully</p>
                  <p className="text-white/60 text-xs">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">CPU Usage</span>
                  <span className="text-white font-mono">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Memory Usage</span>
                  <span className="text-white font-mono">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">Disk Usage</span>
                  <span className="text-white font-mono">32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}