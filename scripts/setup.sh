#!/bin/bash

echo "🚀 Setting up M4Capital Trading Platform..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
echo "🔧 Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo "⚠️  Please update .env.local with your actual values"
fi

# Generate Prisma client
echo "🗄️ Setting up database..."
npx prisma generate

# Run database migrations
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your database and auth credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000 to see your trading platform"
echo ""
echo "🔐 Demo credentials:"
echo "Email: demo@m4capital.com"
echo "Password: demo123"