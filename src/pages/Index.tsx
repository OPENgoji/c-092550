import { useState, useEffect } from 'react';
import WalletConnect from "@/components/WalletConnect";
import TokenInfo from "@/components/TokenInfo";
import GoldenPUFChart from "@/components/GoldenPUFChart";
import TokenButtons from "@/components/TokenButtons";
import DailyReward from "@/components/DailyReward";
import TelegramInfo from "@/components/TelegramInfo";
import TokenRain from "@/components/TokenRain";
import { WorldIDUser } from "@/types/worldid";
import { PointsStorage } from "@/utils/pointsStorage";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [worldIdUser, setWorldIdUser] = useState<WorldIDUser | null>(null);
  const [showTokenRain, setShowTokenRain] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);

  const handleWalletConnect = (address: string, worldId?: WorldIDUser) => {
    setWalletAddress(address);
    setWorldIdUser(worldId || null);
    
    // Используем улучшенную систему загрузки поинтов
    const userData = PointsStorage.getUserPointsData(address);
    setUserPoints(userData?.points || 0);
    
    // Сохраняем данные World ID с backup
    if (worldId) {
      try {
        localStorage.setItem(`worldid_${address}`, JSON.stringify(worldId));
        localStorage.setItem(`worldid_backup_${address}_${Date.now()}`, JSON.stringify(worldId));
      } catch (error) {
        console.error('Failed to save World ID data:', error);
      }
    }
  };

  const handleRewardClaim = () => {
    console.log("Reward claim triggered, showing token rain");
    setShowTokenRain(true);
    
    // Больше поинтов для верифицированных пользователей World ID
    const rewardMultiplier = worldIdUser?.verified ? 2 : 1;
    const rewardAmount = 1 * rewardMultiplier;
    const newPoints = userPoints + rewardAmount;
    
    setUserPoints(newPoints);
    
    // Используем улучшенную систему сохранения
    PointsStorage.saveUserPoints(walletAddress, newPoints, worldIdUser);
    
    // Триггерим событие для обновления статистики
    window.dispatchEvent(new Event('storage'));
  };

  const handleRainComplete = () => {
    console.log("Token rain completed");
    setShowTokenRain(false);
  };

  // Автоматически подключаем пользователя, если он уже подключался ранее
  useEffect(() => {
    const lastWallet = localStorage.getItem('lastConnectedWallet');
    if (lastWallet) {
      setWalletAddress(lastWallet);
      const userData = PointsStorage.getUserPointsData(lastWallet);
      setUserPoints(userData?.points || 0);
      
      // Восстанавливаем World ID данные
      try {
        const worldIdData = localStorage.getItem(`worldid_${lastWallet}`);
        if (worldIdData) {
          setWorldIdUser(JSON.parse(worldIdData));
        }
      } catch (error) {
        console.error('Failed to restore World ID data:', error);
      }
    }
  }, []);

  // Сохраняем последний подключенный кошелек
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('lastConnectedWallet', walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-yellow-900/10 to-black p-4 md:p-8">
      <TokenRain isActive={showTokenRain} onComplete={handleRainComplete} />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
              alt="GoldenPuF NFT"
              className="w-48 h-48 animate-pulse-subtle token-image mb-6"
            />
            <div>
              <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight">
                GoldenPuF<br />NFT
              </h1>
              <p className="text-muted-foreground text-lg">World Chain NFT Collection Platform</p>
            </div>
          </div>
          
          {!walletAddress && (
            <div className="mt-12 flex justify-center">
              <div className="glass-card p-8 rounded-2xl max-w-md w-full border-2 border-yellow-500/30 shadow-2xl backdrop-blur-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2">Добро пожаловать!</h2>
                  <p className="text-muted-foreground">Подключите кошелек для начала работы</p>
                </div>
                <WalletConnect onConnect={handleWalletConnect} />
              </div>
            </div>
          )}
        </header>

        {walletAddress && (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Connected Wallet:</p>
              <p className="font-mono text-yellow-500">{walletAddress}</p>
              {worldIdUser?.verified && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">World ID Verified (2x rewards)</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-3">
                <DailyReward 
                  walletAddress={walletAddress} 
                  onClaim={handleRewardClaim}
                  userPoints={userPoints}
                />
              </div>
            </div>

            <TokenInfo />
            <GoldenPUFChart />
            <TokenButtons />
            
            <div className="mt-8 flex justify-center">
              <div className="max-w-md w-full">
                <TelegramInfo />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
