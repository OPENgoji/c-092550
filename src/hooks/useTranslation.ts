
import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Main page
    welcome: "Welcome!",
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
    nextReward: "Next tokens in:",
    myPoints: "My tokens",
    
    // Token Info
    tokenInfo: "Token Information",
    totalSupply: "Total Supply",
    currentPrice: "Current Price",
    marketCap: "Market Cap",
    pointsInfo: "Tokens Information",
    earnDaily: "Earn daily tokens that will be converted into real tokens on World Chain. Connect your World Chain wallet and get daily rewards every 24 hours!",
    burnInfo: "Total supply is limited to 10 million tokens",
    futureTokens: "These tokens will be converted to real tokens on World Chain and listed on decentralized exchanges! Only 10 million in the ecosystem - keep collecting and follow project updates. ✨",
    
    // Telegram
    telegramChannel: "Telegram Channel",
    joinCommunity: "Join our community",
    goldenPufSwap: "GoldenPUF SWAP",
    clickToTelegram: "Click to go to Telegram",
    getUpdates: "Get news, updates and chat with the community",
    
    // Token Buttons
    tokenTitle: "GoldenPUF Token",
    contractAddress: "Contract Address:",
    copy: "Copy",
    copied: "Copied!",
    openDexScreener: "Open on DEX Screener",
    buyToken: "Buy GoldenPUF Token",
    stakingComingSoon: "GoldenPUF Token staking coming soon 💸",
    swapComingSoon: "GoldenPUF Token swap coming soon 💰⏰",
    
    // Chart
    liveChart: "GoldenPUF Token Live Chart",
    realTimePrice: "📈 Real-time GoldenPUF Token price"
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
