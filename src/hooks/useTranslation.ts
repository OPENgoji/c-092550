
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
    worldIdVerified: "World ID Verified (2x rewards)",
    
    // Daily Reward
    dailyReward: "Daily NFT Reward",
    claimNow: "Claim 1 GoldenPUF NFT Point",
    nextReward: "Next special NFT points in:",
    myPoints: "My special NFT",
    
    // Token Info
    tokenInfo: "Token Information",
    totalSupply: "Total Supply",
    currentPrice: "Current Price",
    marketCap: "Market Cap",
    pointsInfo: "Points Information",
    earnDaily: "Earn daily points that will be converted into an exclusive NFT collection on World Chain. Connect your World Chain wallet and get daily rewards every 24 hours!",
    burnInfo: "A massive burn is planned from 100 million points, 86 million points (86%) will be burned. Only 14 million NFT points will remain",
    futureTokens: "These points may turn into tokens or NFT collection in the future! Only 14 million in the ecosystem - keep collecting and follow project updates. ✨",
    
    // Telegram
    telegramChannel: "Telegram Channel",
    joinCommunity: "Join our community",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Click to go to Telegram",
    getUpdates: "Get news, updates and chat with the community",
    
    // Token Buttons
    tokenTitle: "GoldenPUF $GPUF token",
    contractAddress: "Contract Address:",
    copy: "Copy",
    copied: "Copied!",
    openDexScreener: "Open on DEX Screener",
    buyToken: "Buy GoldenPUF $GPUF token",
    stakingComingSoon: "GoldenPUF $GPUF token staking and mining coming soon 💸",
    swapComingSoon: "GoldenPUF $GPUF token swap coming soon 💰⏰",
    
    // Chart
    liveChart: "GoldenPUF $GPUF Live Chart",
    realTimePrice: "📈 Real-time GoldenPUF $GPUF token price - Contract: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
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
