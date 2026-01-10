#!/bin/bash

# ============================================
# Setup Script: Local UI → DigitalOcean APIs
# ============================================

echo "🚀 Setting up local development with DigitalOcean backend..."
echo ""

# Check if .env.development already exists
if [ -f ".env.development" ]; then
    echo "⚠️  .env.development already exists!"
    echo ""
    read -p "Do you want to overwrite it? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Create .env.development
echo "📝 Creating .env.development..."
cat > .env.development << 'EOF'
# ============================================
# LOCAL DEVELOPMENT → DIGITALOCEAN BACKEND
# ============================================

# Trade Identity Service - DigitalOcean
VITE_API_TRADE_IDENTITY_URL=https://trade-identity-service-nhn7h.ondigitalocean.app/api/trade-identity/v1

# Trade Operation Service - DigitalOcean
VITE_API_TRADE_OPERATION_URL=https://trade-operation-service-2qkev.ondigitalocean.app/api/trade-operation/v1

# Environment
VITE_APP_ENV=development

# Feature Flags
VITE_USE_MOCK_API=false          # Use real DigitalOcean APIs
VITE_API_LOGGING_ENABLED=true    # Enable logging for debugging

# ============================================
# CONFIGURATION: Local UI → DigitalOcean Backend
# Created: $(date)
# ============================================
EOF

echo "✅ .env.development created successfully!"
echo ""

# Display configuration
echo "📋 Your configuration:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat .env.development
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Clear Vite cache
if [ -d "node_modules/.vite" ]; then
    echo "🧹 Clearing Vite cache..."
    rm -rf node_modules/.vite
    echo "✅ Cache cleared"
    echo ""
fi

# Success message
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Run: npm run dev"
echo "   2. Open: http://localhost:5173"
echo "   3. Your UI will connect to DigitalOcean backend"
echo ""
echo "🔍 Verify it's working:"
echo "   - Check browser console for API URLs"
echo "   - Network tab should show requests to DigitalOcean"
echo "   - Try logging in with test credentials"
echo ""
echo "📚 Need help? Read: /LOCAL_DEV_WITH_DIGITALOCEAN_APIS.md"
echo ""
echo "🚀 Ready to start!"
