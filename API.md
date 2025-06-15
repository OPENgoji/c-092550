
# API Documentation - GoldenPUF NFT

## 🌍 World Chain Integration APIs

This document outlines the API integrations and interfaces used in the GoldenPUF NFT application.

## 🔗 Core Integrations

### World ID API
```typescript
interface WorldIDVerificationResult {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: string;
}

interface WorldIDConfig {
  app_id: string;
  action: string;
  signal?: string;
}
```

### World Chain Configuration
```typescript
interface WorldChainConfig {
  network: 'mainnet' | 'testnet';
  rpcUrl: string;
  chainId: number;
}

const WORLD_CHAIN_CONFIG: WorldChainConfig = {
  network: 'mainnet',
  rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
  chainId: 480
};
```

## 🪙 Token Contract Interface

### GoldenPUF Token Contract
```typescript
interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  contract_address: string;
  total_supply?: string;
  price_usd?: number;
}

const GOLDENPUF_TOKEN: TokenInfo = {
  symbol: 'GOLDENPUF-NFT',
  name: 'GoldenPUF NFT Token',
  decimals: 18,
  contract_address: '0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd'
};
```

### Smart Contract Methods
```typescript
interface GoldenPUFContract {
  // Read methods
  balanceOf(address: string): Promise<BigNumber>;
  totalSupply(): Promise<BigNumber>;
  decimals(): Promise<number>;
  symbol(): Promise<string>;
  name(): Promise<string>;
  
  // Write methods (if applicable)
  transfer(to: string, amount: BigNumber): Promise<TransactionResponse>;
  approve(spender: string, amount: BigNumber): Promise<TransactionResponse>;
}
```

## 👤 User Management APIs

### User Points Data
```typescript
interface UserPointsData {
  points: number;
  walletAddress: string;
  worldIdVerified: boolean;
  nullifierHash?: string;
  lastUpdated: number;
  version: string;
  transactions: PointsTransaction[];
}

interface PointsTransaction {
  id: string;
  amount: number;
  type: 'daily_reward' | 'bonus' | 'conversion';
  timestamp: number;
  worldIdMultiplier: boolean;
}
```

### Points Storage API
```typescript
class PointsStorage {
  static saveUserPoints(
    walletAddress: string, 
    points: number, 
    worldIdData?: WorldIDUser
  ): void;
  
  static getUserPointsData(walletAddress: string): UserPointsData | null;
  
  static exportUserDataForNFT(walletAddress: string): any;
  
  static getAllUsers(): Record<string, any>;
}
```

## 🔐 World ID Integration

### Verification Flow
```typescript
// World ID Configuration
const WORLD_ID_CONFIG = {
  app_id: "app_staging_15daccf5b7d4ec9b7dbba044a8fdeab5",
  action: "verify-golden-puf-user",
  verification_level: VerificationLevel.Orb
};

// Verification Handler
const handleWorldIDVerify = async (result: ISuccessResult) => {
  const verificationData: WorldIDVerificationResult = {
    merkle_root: result.merkle_root,
    nullifier_hash: result.nullifier_hash,
    proof: result.proof,
    verification_level: result.verification_level
  };
  
  // Store verification data
  localStorage.setItem('worldid_verification', JSON.stringify(verificationData));
  
  return verificationData;
};
```

### World ID Widget Implementation
```typescript
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';

<IDKitWidget
  app_id={APP_ID}
  action={ACTION}
  signal=""
  onSuccess={handleVerify}
  onError={onError}
  verification_level={VerificationLevel.Orb}
>
  {({ open }) => (
    <button onClick={open}>
      Verify with World ID
    </button>
  )}
</IDKitWidget>
```

## 💰 Rewards System API

### Daily Reward Logic
```typescript
interface RewardCalculation {
  baseReward: number;
  worldIdMultiplier: number;
  finalReward: number;
  canClaim: boolean;
  nextClaimTime?: number;
}

const calculateDailyReward = (
  walletAddress: string,
  worldIdVerified: boolean
): RewardCalculation => {
  const baseReward = 1;
  const multiplier = worldIdVerified ? 2 : 1;
  const finalReward = baseReward * multiplier;
  
  const lastClaim = localStorage.getItem(`lastClaim_${walletAddress}`);
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  const canClaim = !lastClaim || (now - parseInt(lastClaim)) >= twentyFourHours;
  const nextClaimTime = lastClaim ? parseInt(lastClaim) + twentyFourHours : undefined;
  
  return {
    baseReward,
    worldIdMultiplier: multiplier,
    finalReward,
    canClaim,
    nextClaimTime
  };
};
```

### Claim Reward Implementation
```typescript
const claimDailyReward = async (
  walletAddress: string,
  worldIdUser?: WorldIDUser
): Promise<number> => {
  const calculation = calculateDailyReward(walletAddress, worldIdUser?.verified || false);
  
  if (!calculation.canClaim) {
    throw new Error('Reward not yet available');
  }
  
  // Record claim time
  localStorage.setItem(`lastClaim_${walletAddress}`, Date.now().toString());
  
  // Update points
  const currentPoints = PointsStorage.getUserPointsData(walletAddress)?.points || 0;
  const newPoints = currentPoints + calculation.finalReward;
  
  PointsStorage.saveUserPoints(walletAddress, newPoints, worldIdUser);
  
  return calculation.finalReward;
};
```

## 🔗 External APIs

### TradingView Widget
```typescript
import TradingViewWidget from 'react-tradingview-widget';

const chartConfig = {
  symbol: "WORLDCHAIN:0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd",
  theme: "Dark",
  locale: "en",
  autosize: true,
  interval: "15",
  toolbar_bg: "#141413",
  enable_publishing: false,
  hide_top_toolbar: false,
  save_image: false,
  container_id: "goldenpuf_live_chart",
  withdateranges: true,
  range: "1d",
  style: "1",
  details: true,
  hotlist: true,
  calendar: false,
  studies: [
    "Volume@tv-basicstudies",
    "MACD@tv-basicstudies"
  ]
};
```

### DEX Screener Integration
```typescript
const DEX_SCREENER_URLS = {
  token: "https://dexscreener.com/worldchain/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd",
  api: "https://api.dexscreener.com/latest/dex/tokens/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
};
```

## 🎨 UI Component APIs

### Translation Hook
```typescript
interface TranslationHook {
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
}

const useTranslation = (): TranslationHook => {
  // Implementation details
};
```

### Toast Notifications
```typescript
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Success notification
toast({
  title: "Success",
  description: "Daily reward claimed successfully!",
  variant: "default"
});

// Error notification
toast({
  title: "Error", 
  description: "Failed to claim reward",
  variant: "destructive"
});
```

## 📊 Analytics API

### User Analytics
```typescript
interface UserAnalytics {
  dailyActiveUsers: number;
  totalRewardsClaimed: number;
  worldIdVerificationRate: number;
  averagePointsPerUser: number;
}

const trackUserEvent = (
  event: string,
  properties: Record<string, any>
) => {
  // Analytics implementation
  console.log(`Event: ${event}`, properties);
};
```

### Performance Monitoring
```typescript
interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

const trackPerformance = (metrics: PerformanceMetrics) => {
  // Performance tracking implementation
};
```

## 🔄 State Management

### Global State Interface
```typescript
interface AppState {
  walletAddress: string;
  worldIdUser: WorldIDUser | null;
  userPoints: number;
  showTokenRain: boolean;
  isLoading: boolean;
}

interface AppActions {
  setWalletAddress: (address: string) => void;
  setWorldIdUser: (user: WorldIDUser | null) => void;
  setUserPoints: (points: number) => void;
  toggleTokenRain: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
}
```

## 🛠️ Utility Functions

### Local Storage Utilities
```typescript
const StorageUtils = {
  save: (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage save failed:', error);
    }
  },
  
  load: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage load failed:', error);
      return null;
    }
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
};
```

### Wallet Utilities
```typescript
const WalletUtils = {
  isValidAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },
  
  formatAddress: (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },
  
  isWorldChainNetwork: async (): Promise<boolean> => {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return parseInt(chainId, 16) === 480; // World Chain ID
    }
    return false;
  }
};
```

## 🚨 Error Handling

### Error Types
```typescript
enum ErrorType {
  WALLET_CONNECTION = 'WALLET_CONNECTION',
  WORLD_ID_VERIFICATION = 'WORLD_ID_VERIFICATION',
  REWARD_CLAIM = 'REWARD_CLAIM',
  CONTRACT_INTERACTION = 'CONTRACT_INTERACTION',
  NETWORK_ERROR = 'NETWORK_ERROR'
}

interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
  timestamp: number;
}
```

### Error Handler
```typescript
const handleError = (error: AppError) => {
  console.error('Application Error:', error);
  
  // Log to analytics
  trackUserEvent('error_occurred', {
    type: error.type,
    message: error.message,
    timestamp: error.timestamp
  });
  
  // Show user-friendly message
  toast({
    title: "Error",
    description: getErrorMessage(error.type),
    variant: "destructive"
  });
};
```

## 📱 World App Specific APIs

### World App Bridge
```typescript
interface WorldAppBridge {
  // Wallet methods
  connectWallet(): Promise<string>;
  disconnectWallet(): void;
  getWalletAddress(): Promise<string>;
  
  // World ID methods
  requestVerification(): Promise<WorldIDVerificationResult>;
  getVerificationStatus(): Promise<boolean>;
  
  // Navigation methods
  openExternalLink(url: string): void;
  showShare(content: ShareContent): void;
  
  // Storage methods
  setSecureItem(key: string, value: string): Promise<void>;
  getSecureItem(key: string): Promise<string | null>;
}
```

## 📞 Support & Documentation

### API Support
- **Technical Documentation:** This file and inline code comments
- **Integration Support:** tech-support@goldenpuf.com
- **World Chain Support:** [World Chain Docs](https://docs.worldchain.org)
- **World ID Support:** [World ID Docs](https://docs.worldcoin.org/id)

### Rate Limits
- **Daily Rewards:** 1 claim per wallet per 24 hours
- **World ID Verification:** 1 verification per nullifier hash
- **API Calls:** Standard rate limiting applies to external APIs

---

**Note:** This API documentation is specific to the World App platform integration. Standard web APIs may not be available.

*For additional API support or custom integrations, contact our development team.*
