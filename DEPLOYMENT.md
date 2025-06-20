
# Deployment Guide - GoldenPUF Token World App Integration

## 🌍 World App Exclusive Deployment

**Important:** This application is designed exclusively for the World App platform and is **NOT** deployed as a web application or mobile app stores.

## 📱 Complete World App Integration

### Application Details
- **App ID:** `app_de95af90f10c78687dd4d723124bdad0`
- **Team ID:** `team_ad489f561da23f72d61b3ba9e0962cf0`
- **Platform:** World App Mini-App
- **Network:** World Chain Mainnet (Chain ID: 480)
- **Status:** Live and Active

### Official Access Points
- **Primary Access:** World App → Mini-Apps → GoldenPUF Token
- **Developer Portal:** [https://developer.worldcoin.org/teams/team_ad489f561da23f72d61b3ba9e0962cf0/apps/app_de95af90f10c78687dd4d723124bdad0](https://developer.worldcoin.org/teams/team_ad489f561da23f72d61b3ba9e0962cf0/apps/app_de95af90f10c78687dd4d723124bdad0)
- **Auth Portal:** [World Developer Auth](https://worldcoin-developer-portal.eu.auth0.com/)

## 🔧 World App Configuration

### Environment Variables
```bash
# World Chain Configuration
VITE_WORLD_CHAIN_RPC=https://worldchain-mainnet.g.alchemy.com/public
VITE_WORLD_CHAIN_ID=480
VITE_WORLD_APP_ID=app_de95af90f10c78687dd4d723124bdad0

# World ID Configuration
VITE_WORLD_ID_APP_ID=app_staging_de95af90f10c78687dd4d723124bdad0
VITE_WORLD_ID_ACTION=verify-golden-puf-user
VITE_WORLD_ID_VERIFICATION_LEVEL=orb

# MiniKit Configuration
VITE_MINIKIT_APP_ID=app_de95af90f10c78687dd4d723124bdad0
VITE_MINIKIT_WORLD_CHAIN_RPC=https://worldchain-mainnet.g.alchemy.com/public

# Premium Payment Configuration
VITE_WLD_TOKEN_CONTRACT=0x2cFc85d8E48F8EAB294be644d9E25C3030863003
VITE_PAYMENT_RECIPIENT=0x4efd0575242c6c8414dfc2a8d06d3b38640a7dd3
```

### World App Manifest
```json
{
  "name": "GoldenPUF Token",
  "short_name": "GoldenPUF",
  "description": "Daily rewards and token collection on World Chain",
  "version": "2.0.0",
  "world_app": {
    "app_id": "app_de95af90f10c78687dd4d723124bdad0",
    "team_id": "team_ad489f561da23f72d61b3ba9e0962cf0",
    "supported_chains": ["world-chain"],
    "requires_world_id": true,
    "verification_level": "orb",
    "minikit_integration": true,
    "permissions": [
      "wallet_connect",
      "world_id_verify",
      "minikit_commands",
      "local_storage",
      "push_notifications",
      "biometric_auth"
    ],
    "features": {
      "daily_rewards": true,
      "premium_subscription": true,
      "token_distribution": true,
      "airdrop_preparation": true
    }
  }
}
```

## 🏗️ Build Configuration

### Vite Configuration for World App
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          worldcoin: ['@worldcoin/idkit', '@worldcoin/minikit-js'],
          ui: ['lucide-react', '@radix-ui/react-toast']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'globalThis'
  },
  optimizeDeps: {
    include: ['@worldcoin/idkit', '@worldcoin/minikit-js']
  }
});
```

### World Chain Network Configuration
```typescript
const WORLD_CHAIN_CONFIG = {
  chainId: 480,
  name: 'World Chain',
  rpcUrls: {
    default: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public']
    },
    public: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public']
    }
  },
  blockExplorers: {
    default: {
      name: 'WorldScan',
      url: 'https://worldscan.org'
    }
  },
  contracts: {
    wldToken: {
      address: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003'
    }
  }
};
```

## 🚀 Deployment Process

### 1. World Developer Portal Setup
1. **Access Developer Portal:** [https://developer.worldcoin.org](https://developer.worldcoin.org)
2. **Authenticate:** Use World ID for secure access
3. **Navigate to Team:** `team_ad489f561da23f72d61b3ba9e0962cf0`
4. **Select Application:** `app_de95af90f10c78687dd4d723124bdad0`
5. **Configure Settings:** Update app configuration and permissions

### 2. Build Preparation
```bash
# Clean installation
rm -rf dist node_modules
npm install

# Environment setup
cp .env.example .env.production
# Configure production environment variables

# Production build
npm run build

# Verify build
npm run preview
```

### 3. World App Deployment
```bash
# Deploy to World App Platform
npm run deploy:world-app

# Verify deployment
npm run verify:world-app

# Update app status
npm run status:world-app
```

### 4. Integration Testing
- **World ID Verification:** Test complete verification flow
- **MiniKit Commands:** Verify all wallet operations
- **Premium Payments:** Test WLD token transactions
- **Daily Rewards:** Confirm reward distribution
- **Token Tracking:** Validate point accumulation

## 🔐 Security Configuration

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://cdn.worldcoin.org 
    https://bridge.worldcoin.org
    https://minikit.worldcoin.org;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  connect-src 'self' 
    https://worldchain-mainnet.g.alchemy.com
    https://api.worldcoin.org
    https://bridge.worldcoin.org
    wss://worldchain-mainnet.g.alchemy.com;
  frame-src 
    https://bridge.worldcoin.org
    https://minikit.worldcoin.org;
  worker-src 'self' blob:;
">
```

### World App Security Requirements
- **HTTPS Only:** All connections must use HTTPS
- **World ID Integration:** Mandatory for enhanced security
- **MiniKit Security:** Secure wallet operations only
- **No Mixed Content:** All resources must be secure
- **CSP Compliance:** Strict content security policy

## 📊 Monitoring & Analytics

### World App Analytics
```typescript
// Analytics configuration
const ANALYTICS_CONFIG = {
  app_id: "app_de95af90f10c78687dd4d723124bdad0",
  events: [
    'wallet_connect',
    'world_id_verify',
    'daily_claim',
    'premium_purchase',
    'token_accumulation'
  ],
  metrics: [
    'daily_active_users',
    'verification_rate',
    'premium_conversion',
    'token_distribution',
    'session_duration'
  ]
};
```

### Performance Monitoring
- **Load Times:** World App initialization tracking
- **User Interactions:** Comprehensive user journey analytics
- **Error Tracking:** Real-time error monitoring and alerts
- **World Chain Monitoring:** Network performance and transaction success
- **MiniKit Performance:** Wallet operation efficiency

## 🧪 Testing Strategy

### Pre-Deployment Testing
```bash
# World App Compatibility
npm run test:world-app

# World ID Integration
npm run test:world-id

# MiniKit Commands
npm run test:minikit

# Premium Payments
npm run test:payments

# Token Distribution
npm run test:rewards
```

### Testing Checklist
- [ ] **World ID Verification** working correctly
- [ ] **MiniKit Wallet Connection** successful
- [ ] **Daily Rewards System** functioning
- [ ] **Premium Subscriptions** processing payments
- [ ] **Token Tracking** accurate across all wallets
- [ ] **World Chain Integration** stable and reliable
- [ ] **Mobile Responsiveness** perfect on all devices
- [ ] **Error Handling** comprehensive and user-friendly

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: World App Deployment

on:
  push:
    branches: [main, develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: |
          npm run test
          npm run test:world-app
          npm run test:integration
      
      - name: Build application
        run: npm run build
        env:
          VITE_WORLD_APP_ID: ${{ secrets.WORLD_APP_ID }}
          VITE_WORLD_ID_APP_ID: ${{ secrets.WORLD_ID_APP_ID }}
      
      - name: Deploy to World App
        run: npm run deploy:world-app
        env:
          WORLD_APP_TOKEN: ${{ secrets.WORLD_APP_TOKEN }}
          WORLD_DEVELOPER_API_KEY: ${{ secrets.WORLD_DEVELOPER_API_KEY }}
      
      - name: Verify deployment
        run: npm run verify:deployment
```

## 🆘 Troubleshooting

### Common Issues & Solutions

**World ID Verification Fails**
```typescript
// Check configuration
const worldIdConfig = {
  app_id: "app_staging_de95af90f10c78687dd4d723124bdad0",
  action: "verify-golden-puf-user",
  verification_level: VerificationLevel.Orb
};

// Debug verification
console.log('World ID Config:', worldIdConfig);
```

**MiniKit Connection Issues**
```typescript
// Verify MiniKit installation
if (!MiniKit.isInstalled()) {
  console.error('MiniKit not available - app must run in World App');
  return;
}

// Test MiniKit commands
try {
  await MiniKit.commandsAsync.walletAuth({
    nonce: Math.random().toString(36),
    requestId: Math.random().toString(36)
  });
} catch (error) {
  console.error('MiniKit error:', error);
}
```

**Premium Payment Failures**
```typescript
// Verify WLD contract
const WLD_CONTRACT = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003";
const RECIPIENT = "0x4efd0575242c6c8414dfc2a8d06d3b38640a7dd3";

// Check transaction parameters
console.log('Payment config:', { WLD_CONTRACT, RECIPIENT });
```

## 📞 Support & Maintenance

### Development Support
- **Technical Issues:** ministotele@gmail.com
- **World App Integration:** [Developer Portal Support](https://developer.worldcoin.org/support)
- **Emergency Deployment:** 24/7 support available
- **Community Support:** [Telegram Group](https://t.me/GoldenPUFswap)

### Maintenance Schedule
- **Daily Monitoring:** Automated health checks
- **Weekly Updates:** Performance optimization
- **Monthly Releases:** Feature updates and improvements
- **Quarterly Reviews:** Security audits and compliance checks

---

**🚀 Successfully Deployed on World App Platform! 🚀**

*Complete integration with World Chain, World ID, and MiniKit for the ultimate user experience.*
