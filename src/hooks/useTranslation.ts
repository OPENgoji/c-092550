
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
    dailyReward: "Daily Reward",
    claimNow: "Claim Now",
    nextReward: "Next reward in:",
    myPoints: "My Points",
    
    // Token Info
    tokenInfo: "Token Information",
    totalSupply: "Total Supply",
    currentPrice: "Current Price",
    marketCap: "Market Cap",
    
    // Telegram
    telegramChannel: "Telegram Channel",
    joinCommunity: "Join our community",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Click to go to Telegram",
    getUpdates: "Get news, updates and chat with the community"
  },
  es: {
    // Main page
    welcome: "¡Bienvenido!",
    connectWallet: "Conecta la billetera para comenzar",
    connectedWallet: "Billetera Conectada:",
    worldIdVerified: "World ID Verificado (2x recompensas)",
    
    // Daily Reward
    dailyReward: "Recompensa Diaria",
    claimNow: "Reclamar Ahora",
    nextReward: "Próxima recompensa en:",
    myPoints: "Mis Puntos",
    
    // Token Info
    tokenInfo: "Información del Token",
    totalSupply: "Suministro Total",
    currentPrice: "Precio Actual",
    marketCap: "Capitalización de Mercado",
    
    // Telegram
    telegramChannel: "Canal de Telegram",
    joinCommunity: "Únete a nuestra comunidad",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Haz clic para ir a Telegram",
    getUpdates: "Obtén noticias, actualizaciones y chatea con la comunidad"
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
