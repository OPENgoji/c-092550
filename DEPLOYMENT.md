
# Deployment Guide - GoldenPUF NFT

## 🌍 World App Exclusive Deployment

**Important:** This application is designed exclusively for the World App platform and is **NOT** deployed as a web application or mobile app stores.

## 📱 World App Integration

### Application Details
- **App ID:** `app_15daccf5b7d4ec9b7dbba044a8fdeab5`
- **Team ID:** `team_ad489f561da23f72d61b3ba9e0962cf0`
- **Developer App ID:** `app_b924910c34c036984df5a50cd6f122e9`
- **Platform:** World App Mini-App
- **Network:** World Chain Mainnet

### Official Access Points
- **Primary Access:** Through World App mini-app section
- **Token Purchase:** [World App Token Link](https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd)
- **Developer Portal:** [World Developer Console](https://developer.worldcoin.org/teams/team_ad489f561da23f72d61b3ba9e0962cf0/apps/app_b924910c34c036984df5a50cd6f122e9)

## 🏗️ Build Process

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### Build Commands
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview

# Development server (for testing only)
npm run dev
```

### Build Configuration
```json
{
  "build": {
    "target": "es2020",
    "outDir": "dist",
    "sourcemap": false,
    "minify": true,
    "cssMinify": true
  }
}
```

## 🌐 World App Deployment Configuration

### Environment Variables
```bash
# World Chain Configuration
VITE_WORLD_CHAIN_RPC=https://worldchain-mainnet.g.alchemy.com/public
VITE_WORLD_CHAIN_ID=480
VITE_WORLD_APP_ID=app_15daccf5b7d4ec9b7dbba044a8fdeab5

# World ID Configuration
VITE_WORLD_ID_APP_ID=app_staging_15daccf5b7d4ec9b7dbba044a8fdeab5
VITE_WORLD_ID_ACTION=verify-golden-puf-user

# Contract Configuration
VITE_TOKEN_CONTRACT=0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd
```

### World App Manifest Configuration
```json
{
  "name": "GoldenPUF NFT",
  "short_name": "GoldenPUF",
  "description": "Daily rewards and exclusive NFT collection on World Chain",
  "version": "1.0.0",
  "world_app": {
    "app_id": "app_15daccf5b7d4ec9b7dbba044a8fdeab5",
    "supported_chains": ["world-chain"],
    "requires_world_id": true,
    "permissions": [
      "wallet_connect",
      "world_id_verify",
      "local_storage"
    ]
  }
}
```

## 🔐 Security Configuration

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.worldcoin.org;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://worldchain-mainnet.g.alchemy.com https://api.worldcoin.org;
  frame-src https://bridge.worldcoin.org;
">
```

### HTTPS Requirements
- All connections must use HTTPS
- World App enforces secure connections
- No mixed content allowed

## 📊 Performance Optimization

### Bundle Size Optimization
```javascript
// Vite configuration for optimization
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          worldcoin: ['@worldcoin/idkit'],
          ui: ['lucide-react', '@radix-ui/react-toast']
        }
      }
    }
  }
}
```

### Asset Optimization
- Images compressed and optimized
- Lazy loading for non-critical components
- Tree shaking for unused code
- Code splitting for better performance

## 🧪 Testing Before Deployment

### Pre-Deployment Checklist
- [ ] World ID integration working
- [ ] Wallet connection functional
- [ ] Daily rewards system operational
- [ ] Point tracking accurate
- [ ] World Chain contract interaction working
- [ ] UI responsive on mobile devices
- [ ] Error handling comprehensive
- [ ] Security measures in place

### Testing Commands
```bash
# Run all tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build && npm run preview
```

## 🚀 Deployment Process

### 1. World Developer Portal Setup
1. Access [World Developer Portal](https://developer.worldcoin.org)
2. Navigate to your team: `team_ad489f561da23f72d61b3ba9e0962cf0`
3. Select the GoldenPUF app: `app_b924910c34c036984df5a50cd6f122e9`
4. Configure app settings and permissions

### 2. Build Preparation
```bash
# Clean and build
rm -rf dist node_modules
npm install
npm run build
```

### 3. Upload to World App Platform
1. **Archive Build:** Create production build archive
2. **Upload Assets:** Upload to World App hosting
3. **Configure Routing:** Set up app routing within World App
4. **Set Permissions:** Configure required permissions

### 4. Configuration Verification
- Verify app ID configuration
- Test World ID integration
- Validate wallet connections
- Check contract interactions

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: World App Deployment

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to World App
        run: npm run deploy:world-app
        env:
          WORLD_APP_TOKEN: ${{ secrets.WORLD_APP_TOKEN }}
```

## 📱 World App Specific Features

### Deep Linking
```typescript
// Handle World App deep links
const handleWorldAppLink = (path: string) => {
  const baseUrl = 'https://worldcoin.org/mini-app';
  const appId = 'app_15daccf5b7d4ec9b7dbba044a8fdeab5';
  return `${baseUrl}?app_id=${appId}&path=${path}`;
};
```

### World App API Integration
```typescript
// World App specific APIs
interface WorldAppAPI {
  wallet: {
    connect(): Promise<string>;
    disconnect(): void;
    getBalance(): Promise<string>;
  };
  worldId: {
    verify(): Promise<WorldIDResult>;
  };
  storage: {
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
  };
}
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
- **Load Times:** Track app initialization
- **User Interactions:** Monitor button clicks and navigation
- **Error Tracking:** Comprehensive error logging
- **Usage Analytics:** Daily active users and session duration

### World Chain Monitoring
- **Contract Interactions:** Monitor smart contract calls
- **Transaction Success Rate:** Track transaction failures
- **Gas Usage:** Monitor gas consumption
- **Network Health:** World Chain network status

## 🆘 Troubleshooting

### Common Issues

**World ID Verification Fails**
```typescript
// Check World ID configuration
const worldIdConfig = {
  app_id: "app_staging_15daccf5b7d4ec9b7dbba044a8fdeab5",
  action: "verify-golden-puf-user",
  verification_level: VerificationLevel.Orb
};
```

**Wallet Connection Issues**
```typescript
// Verify World Chain network
const worldChainConfig = {
  chainId: 480,
  rpcUrl: "https://worldchain-mainnet.g.alchemy.com/public"
};
```

**Contract Interaction Errors**
```typescript
// Verify contract address
const contractAddress = "0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd";
```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm run dev
```

## 📞 Support & Maintenance

### Deployment Support
- **Technical Issues:** tech-support@goldenpuf.com
- **World App Integration:** world-app-support@goldenpuf.com
- **Emergency Hotline:** +1-XXX-XXX-XXXX

### Maintenance Schedule
- **Regular Updates:** Monthly feature updates
- **Security Patches:** As needed
- **World App Compatibility:** Continuous monitoring
- **Performance Optimization:** Quarterly reviews

## 📚 Resources

### Documentation
- [World App Developer Docs](https://docs.worldcoin.org/mini-apps)
- [World ID Integration Guide](https://docs.worldcoin.org/id)
- [World Chain Documentation](https://docs.worldchain.org)

### Tools
- [World Developer Portal](https://developer.worldcoin.org)
- [World Chain Explorer](https://worldscan.org)
- [DEX Screener](https://dexscreener.com/worldchain)

---

**Note:** This application is exclusively designed for World App platform. Traditional web deployment is not supported or recommended.

*For technical support or deployment assistance, contact our development team.*
