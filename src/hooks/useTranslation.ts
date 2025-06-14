
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
  },
  es: {
    // Main page
    welcome: "¡Bienvenido!",
    connectWallet: "Conecta la billetera para comenzar",
    connectedWallet: "Billetera Conectada:",
    worldIdVerified: "World ID Verificado (2x recompensas)",
    
    // Daily Reward
    dailyReward: "Recompensa NFT Diaria",
    claimNow: "Reclamar 1 Punto NFT GoldenPUF",
    nextReward: "Próximos puntos NFT especiales en:",
    myPoints: "Mi NFT especial",
    
    // Token Info
    tokenInfo: "Información del Token",
    totalSupply: "Suministro Total",
    currentPrice: "Precio Actual",
    marketCap: "Capitalización de Mercado",
    pointsInfo: "Información de Puntos",
    earnDaily: "Gana puntos diarios que se convertirán en una colección NFT exclusiva en World Chain. ¡Conecta tu billetera de World Chain y obtén recompensas diarias cada 24 horas!",
    burnInfo: "Se planea una quema masiva de 100 millones de puntos, se quemarán 86 millones de puntos (86%). Solo quedarán 14 millones de puntos NFT",
    futureTokens: "¡Estos puntos pueden convertirse en tokens o colección NFT en el futuro! Solo 14 millones en el ecosistema - sigue recolectando y mantente al día con las actualizaciones del proyecto. ✨",
    
    // Telegram
    telegramChannel: "Canal de Telegram",
    joinCommunity: "Únete a nuestra comunidad",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Haz clic para ir a Telegram",
    getUpdates: "Obtén noticias, actualizaciones y chatea con la comunidad",
    
    // Token Buttons
    tokenTitle: "Token GoldenPUF $GPUF",
    contractAddress: "Dirección del Contrato:",
    copy: "Copiar",
    copied: "¡Copiado!",
    openDexScreener: "Abrir en DEX Screener",
    buyToken: "Comprar token GoldenPUF $GPUF",
    stakingComingSoon: "Staking y minería de token GoldenPUF $GPUF próximamente 💸",
    swapComingSoon: "Intercambio de token GoldenPUF $GPUF próximamente 💰⏰",
    
    // Chart
    liveChart: "Gráfico en Vivo GoldenPUF $GPUF",
    realTimePrice: "📈 Precio en tiempo real del token GoldenPUF $GPUF - Contrato: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
  },
  ru: {
    // Main page
    welcome: "Добро пожаловать!",
    connectWallet: "Подключите кошелек для начала",
    connectedWallet: "Подключенный кошелек:",
    worldIdVerified: "World ID Верифицирован (2x награды)",
    
    // Daily Reward
    dailyReward: "Ежедневная NFT награда",
    claimNow: "Получить 1 NFT поинт GoldenPUF",
    nextReward: "Следующие специальные NFT поинты через:",
    myPoints: "Мои специальные NFT",
    
    // Token Info
    tokenInfo: "Информация о токене",
    totalSupply: "Общее предложение",
    currentPrice: "Текущая цена",
    marketCap: "Рыночная капитализация",
    pointsInfo: "Информация о поинтах",
    earnDaily: "Зарабатывайте ежедневные поинты, которые будут конвертированы в эксклюзивную NFT коллекцию на World Chain. Подключите свой World Chain кошелек и получайте ежедневную награду каждые 24 часа!",
    burnInfo: "Планируется масштабное сжигание из 100 миллионов поинтов будет сожжено 86 миллионов поинтов (86%). Останется только 14 миллионов NFT поинтов",
    futureTokens: "Эти поинты в будущем могут превратиться в токены либо NFT коллекцию! Всего 14 млн в экосистеме - продолжайте собирать и следите за обновлениями проекта. ✨",
    
    // Telegram
    telegramChannel: "Telegram канал",
    joinCommunity: "Присоединяйся к сообществу",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Нажмите для перехода в Telegram",
    getUpdates: "Получайте новости, обновления и общайтесь с сообществом",
    
    // Token Buttons
    tokenTitle: "GoldenPUF $GPUF токен",
    contractAddress: "Адрес контракта:",
    copy: "Копировать",
    copied: "Скопировано!",
    openDexScreener: "Открыть на DEX Screener",
    buyToken: "Купить GoldenPUF $GPUF токен",
    stakingComingSoon: "GoldenPUF $GPUF токен стейкинг и майнинг скоро будет 💸",
    swapComingSoon: "GoldenPUF $GPUF токен swap скоро будет 💰⏰",
    
    // Chart
    liveChart: "GoldenPUF $GPUF График в реальном времени",
    realTimePrice: "📈 Реальная цена токена GoldenPUF $GPUF - Contract: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
  },
  fr: {
    // Main page
    welcome: "Bienvenue!",
    connectWallet: "Connectez votre portefeuille pour commencer",
    connectedWallet: "Portefeuille connecté:",
    worldIdVerified: "World ID Vérifié (2x récompenses)",
    
    // Daily Reward
    dailyReward: "Récompense NFT quotidienne",
    claimNow: "Réclamer 1 Point NFT GoldenPUF",
    nextReward: "Prochains points NFT spéciaux dans:",
    myPoints: "Mon NFT spécial",
    
    // Token Info
    tokenInfo: "Informations sur le token",
    totalSupply: "Offre totale",
    currentPrice: "Prix actuel",
    marketCap: "Capitalisation boursière",
    pointsInfo: "Informations sur les points",
    earnDaily: "Gagnez des points quotidiens qui seront convertis en collection NFT exclusive sur World Chain. Connectez votre portefeuille World Chain et obtenez des récompenses quotidiennes toutes les 24 heures!",
    burnInfo: "Un brûlage massif est prévu sur 100 millions de points, 86 millions de points (86%) seront brûlés. Seuls 14 millions de points NFT resteront",
    futureTokens: "Ces points peuvent se transformer en tokens ou collection NFT dans le futur! Seulement 14 millions dans l'écosystème - continuez à collectionner et suivez les mises à jour du projet. ✨",
    
    // Telegram
    telegramChannel: "Canal Telegram",
    joinCommunity: "Rejoignez notre communauté",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Cliquez pour aller sur Telegram",
    getUpdates: "Obtenez des nouvelles, des mises à jour et discutez avec la communauté",
    
    // Token Buttons
    tokenTitle: "Token GoldenPUF $GPUF",
    contractAddress: "Adresse du contrat:",
    copy: "Copier",
    copied: "Copié!",
    openDexScreener: "Ouvrir sur DEX Screener",
    buyToken: "Acheter le token GoldenPUF $GPUF",
    stakingComingSoon: "Staking et minage du token GoldenPUF $GPUF bientôt disponible 💸",
    swapComingSoon: "Échange de token GoldenPUF $GPUF bientôt disponible 💰⏰",
    
    // Chart
    liveChart: "Graphique en Direct GoldenPUF $GPUF",
    realTimePrice: "📈 Prix en temps réel du token GoldenPUF $GPUF - Contrat: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
  },
  ja: {
    // Main page
    welcome: "ようこそ！",
    connectWallet: "開始するにはウォレットを接続してください",
    connectedWallet: "接続されたウォレット:",
    worldIdVerified: "World ID 認証済み (2倍報酬)",
    
    // Daily Reward
    dailyReward: "デイリーNFT報酬",
    claimNow: "1 GoldenPUF NFTポイントを受け取る",
    nextReward: "次の特別NFTポイントまで:",
    myPoints: "マイ特別NFT",
    
    // Token Info
    tokenInfo: "トークン情報",
    totalSupply: "総供給量",
    currentPrice: "現在価格",
    marketCap: "時価総額",
    pointsInfo: "ポイント情報",
    earnDaily: "World Chainで独占的なNFTコレクションに変換される毎日のポイントを獲得しましょう。World Chainウォレットを接続して24時間ごとに毎日の報酬を受け取りましょう！",
    burnInfo: "1億ポイントから大規模な燃焼が計画されており、8600万ポイント（86％）が燃焼されます。1400万NFTポイントのみが残ります",
    futureTokens: "これらのポイントは将来的にトークンやNFTコレクションになるかもしれません！エコシステムには1400万のみ - 収集を続けてプロジェクトの更新をフォローしてください。✨",
    
    // Telegram
    telegramChannel: "Telegramチャンネル",
    joinCommunity: "コミュニティに参加",
    goldenPufSwap: "GoldenPUF Swap",
    clickToTelegram: "Telegramに移動するにはクリック",
    getUpdates: "ニュース、アップデート、コミュニティとのチャットを受け取る",
    
    // Token Buttons
    tokenTitle: "GoldenPUF $GPUFトークン",
    contractAddress: "コントラクトアドレス:",
    copy: "コピー",
    copied: "コピーしました！",
    openDexScreener: "DEX Screenerで開く",
    buyToken: "GoldenPUF $GPUFトークンを購入",
    stakingComingSoon: "GoldenPUF $GPUFトークンステーキングとマイニングが近日公開 💸",
    swapComingSoon: "GoldenPUF $GPUFトークンスワップが近日公開 💰⏰",
    
    // Chart
    liveChart: "GoldenPUF $GPUF ライブチャート",
    realTimePrice: "📈 GoldenPUF $GPUFトークンのリアルタイム価格 - コントラクト: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
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
