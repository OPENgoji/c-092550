import { useState, useEffect } from 'react';

// Интерфейс для переводов
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Переводы для приложения
const translations: Translations = {
  en: {
    welcome: "Welcome to GoldenPUF NFT",
    connectWallet: "Connect your World Chain wallet to start earning daily rewards",
    connectedWallet: "Connected Wallet:",
    dailyReward: "Daily Reward",
    claimNow: "Claim Daily Reward",
    nextReward: "Next reward available in:",
    myPoints: "My Points",
    worldIdVerified: "World ID Verified - 2x Rewards!",
    tokenInfo: "Token Information",
    liveChart: "Live Price Chart",
    buyToken: "Buy Token",
    comingSoon: "Coming Soon",
    staking: "Staking",
    swap: "Swap",
    tradingViewNotAvailable: "Live chart not available now.",
    unknownError: "Unknown error",
  },
  ru: {
    welcome: "Добро пожаловать в GoldenPUF NFT",
    connectWallet: "Подключите кошелек World Chain для получения ежедневных наград",
    connectedWallet: "Подключенный кошелек:",
    dailyReward: "Ежедневная награда",
    claimNow: "Получить награду",
    nextReward: "Следующая награда доступна через:",
    myPoints: "Мои поинты",
    worldIdVerified: "World ID верифицирован - 2x награды!",
    tokenInfo: "Информация о токене",
    liveChart: "График цены в реальном времени",
    buyToken: "Купить токен",
    comingSoon: "Скоро",
    staking: "Стейкинг",
    swap: "Обмен",
    tradingViewNotAvailable: "График временно недоступен.",
    unknownError: "Неизвестная ошибка",
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    // Определяем язык из localStorage или браузера
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Определяем язык браузера
      const browserLanguage = navigator.language.split('-')[0];
      if (translations[browserLanguage]) {
        setLanguage(browserLanguage);
      }
    }
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const changeLanguage = (newLanguage: string) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('preferred_language', newLanguage);
    }
  };

  return { t, language, setLanguage: changeLanguage };
};
