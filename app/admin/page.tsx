'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'
import AdminStats from '@/components/admin/AdminStats'
import UserManagement from '@/components/admin/UserManagement'
import TransactionManagement from '@/components/admin/TransactionManagement'
import SystemHealth from '@/components/admin/SystemHealth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }

    setIsLoading(false)
  }, [session, status, router])

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner w-8 h-8" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/60">
              Manage users, transactions, and system settings
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <AdminStats />
          </motion.div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-8">
              <TabsTrigger value="users" className="text-white data-[state=active]:bg-gold-500">
                User Management
              </TabsTrigger>
              <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-gold-500">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="system" className="text-white data-[state=active]:bg-gold-500">
                System Health
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionManagement />
            </TabsContent>

            <TabsContent value="system">
              <SystemHealth />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}