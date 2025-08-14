import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const portfolio = await prisma.portfolio.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        value: 'desc'
      }
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Portfolio fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { symbol, name, balance, value, change24h } = body

    const portfolio = await prisma.portfolio.upsert({
      where: {
        userId_symbol: {
          userId: session.user.id,
          symbol: symbol
        }
      },
      update: {
        balance,
        value,
        change24h
      },
      create: {
        userId: session.user.id,
        symbol,
        name,
        balance,
        value,
        change24h
      }
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Portfolio update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}