
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
  },
  ru: {
    // Main page
    welcome: "Добро пожаловать!",
    connectWallet: "Подключите кошелек для начала",
    connectedWallet: "Подключенный кошелек:",
    worldIdVerified: "World ID Верифицирован (2x награды)",
    
    // Daily Reward
    dailyReward: "Ежедневная награда",
    claimNow: "Получить сейчас",
    nextReward: "Следующая награда через:",
    myPoints: "Мои очки",
    
    // Token Info
    tokenInfo: "Информация о токене",
    totalSupply: "Общее предложение",
    currentPrice: "Текущая цена",
    marketCap: "Рыночная капитализация",
    
    // Telegram
    telegramChannel: "Telegram канал",
    joinCommunity: "Присоединяйся к сообществу",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Нажмите для перехода в Telegram",
    getUpdates: "Получайте новости, обновления и общайтесь с сообществом"
  },
  fr: {
    // Main page
    welcome: "Bienvenue!",
    connectWallet: "Connectez votre portefeuille pour commencer",
    connectedWallet: "Portefeuille connecté:",
    worldIdVerified: "World ID Vérifié (2x récompenses)",
    
    // Daily Reward
    dailyReward: "Récompense quotidienne",
    claimNow: "Réclamer maintenant",
    nextReward: "Prochaine récompense dans:",
    myPoints: "Mes points",
    
    // Token Info
    tokenInfo: "Informations sur le token",
    totalSupply: "Offre totale",
    currentPrice: "Prix actuel",
    marketCap: "Capitalisation boursière",
    
    // Telegram
    telegramChannel: "Canal Telegram",
    joinCommunity: "Rejoignez notre communauté",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Cliquez pour aller sur Telegram",
    getUpdates: "Obtenez des nouvelles, des mises à jour et discutez avec la communauté"
  },
  ja: {
    // Main page
    welcome: "ようこそ！",
    connectWallet: "開始するにはウォレットを接続してください",
    connectedWallet: "接続されたウォレット:",
    worldIdVerified: "World ID 認証済み (2倍報酬)",
    
    // Daily Reward
    dailyReward: "デイリー報酬",
    claimNow: "今すぐ受け取る",
    nextReward: "次の報酬まで:",
    myPoints: "マイポイント",
    
    // Token Info
    tokenInfo: "トークン情報",
    totalSupply: "総供給量",
    currentPrice: "現在価格",
    marketCap: "時価総額",
    
    // Telegram
    telegramChannel: "Telegramチャンネル",
    joinCommunity: "コミュニティに参加",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Telegramに移動するにはクリック",
    getUpdates: "ニュース、アップデート、コミュニティとのチャットを受け取る"
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
