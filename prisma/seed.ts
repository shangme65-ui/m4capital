import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@m4capital.com' },
    update: {},
    create: {
      email: 'admin@m4capital.com',
      name: 'M4Capital Admin',
      role: 'ADMIN',
    },
  })

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@m4capital.com' },
    update: {},
    create: {
      email: 'demo@m4capital.com',
      name: 'Demo User',
      role: 'USER',
    },
  })

  // Create sample portfolio for demo user
  const portfolioAssets = [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', balance: 10000, value: 10000, change24h: 0.15 },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', balance: 5000, value: 5100, change24h: 2.0 },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', balance: 8000, value: 7920, change24h: -1.0 },
    { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', balance: 3000, value: 3090, change24h: 3.0 },
    { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', balance: 6000, value: 5940, change24h: -1.0 },
    { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', balance: 4000, value: 4080, change24h: 2.0 },
  ]

  for (const asset of portfolioAssets) {
    await prisma.portfolio.upsert({
      where: {
        userId_symbol: {
          userId: demoUser.id,
          symbol: asset.symbol,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        ...asset,
      },
    })
  }

  // Create sample trading account
  await prisma.tradingAccount.upsert({
    where: { id: 'demo-trading-account' },
    update: {},
    create: {
      id: 'demo-trading-account',
      userId: demoUser.id,
      accountType: 'Standard',
      balance: 41000,
      equity: 41190,
      margin: 5000,
      freeMargin: 36190,
      leverage: 100,
      profit: 190,
    },
  })

  // Create sample market data
  const marketData = [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0543, change24h: 0.15, volume24h: 1234567, high24h: 1.0580, low24h: 1.0520 },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: 1.2789, change24h: 2.0, volume24h: 987654, high24h: 1.2820, low24h: 1.2750 },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: 149.85, change24h: -1.0, volume24h: 2345678, high24h: 150.20, low24h: 149.50 },
    { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', price: 0.6678, change24h: 3.0, volume24h: 654321, high24h: 0.6690, low24h: 0.6650 },
    { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc', price: 0.8765, change24h: -1.0, volume24h: 876543, high24h: 0.8780, low24h: 0.8750 },
    { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', price: 1.3456, change24h: 2.0, volume24h: 543210, high24h: 1.3470, low24h: 1.3440 },
  ]

  for (const data of marketData) {
    await prisma.marketData.upsert({
      where: { symbol: data.symbol },
      update: data,
      create: data,
    })
  }

  // Create sample transactions
  const transactions = [
    {
      userId: demoUser.id,
      type: 'BUY' as const,
      symbol: 'EUR/USD',
      amount: 1000,
      price: 1.0540,
      total: 1054,
      status: 'COMPLETED' as const,
      description: 'Long position on EUR/USD',
    },
    {
      userId: demoUser.id,
      type: 'SELL' as const,
      symbol: 'GBP/USD',
      amount: 500,
      price: 1.2780,
      total: 639,
      status: 'COMPLETED' as const,
      description: 'Short position on GBP/USD',
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })