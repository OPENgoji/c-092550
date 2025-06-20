
import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Main page
    welcome: "Welcome to Golden PUF Token",
    connectWallet: "Connect wallet to get started",
    connectedWallet: "Connected Wallet:",
    disconnect: "Disconnect",
    worldIdVerified: "World ID Verified (2x rewards)",
    
    // World Chain Integration
    worldChainIntegration: "World Chain Integration",
    worldChainDescription: "Connect to World Chain with World ID verification for maximum rewards",
    worldIdActive: "World ID verification active - get 2x rewards!",
    verifyWithWorldId: "Verify with World ID",
    connectWorldChainWallet: "Connect World Chain Wallet",
    connectingToWorldChain: "Connecting to World Chain...",
    
    // Daily Reward
    dailyReward: "Daily special points",
    claimNow: "Claim Now",
    nextReward: "Next points in:",
    
    // Token Info
    tokenInfo: "Golden PUF Token ($GPT)",
    totalSupply: "Total Supply: 10,000,000 $GPT",
    tokenConversion: "All points convert 1:1 to $GPT tokens",
    remainingTokens: "Remaining in pool:",
    earnDaily: "Earn daily points that convert 1:1 to $GPT tokens on World Chain",
    
    // Token Buttons
    tokenTitle: "Golden PUF Token ($GPT)",
    stakingComingSoon: "$GPT Token Staking coming soon 💎",
    swapComingSoon: "$GPT Token Swap coming soon 🚀",
    
    // Premium
    premiumTitle: "Premium Subscription",
    premiumDaily: "100 points daily",
    premiumCost: "Get 100 points daily for 10 WLD",
    premiumActive: "Premium Active"
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', language);
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};
