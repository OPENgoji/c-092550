
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
import { useTranslation } from "@/hooks/useTranslation";
import { LogOut } from "lucide-react";

const MAIN_LOGO = "/lovable-uploads/55fa699e-e967-46e2-9719-3fe4e122ecd8.png";

const Index = () => {
  const { t } = useTranslation();
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

  const handleWalletDisconnect = () => {
    setWalletAddress('');
    setWorldIdUser(null);
    setUserPoints(0);
    setShowTokenRain(false);
    
    // Очищаем localStorage
    localStorage.removeItem('lastConnectedWallet');
    localStorage.removeItem('worldid_verification');
    localStorage.removeItem('worldid_verification_backup');
    
    // Очищаем все данные World ID для всех адресов
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('worldid_')) {
        localStorage.removeItem(key);
      }
    });
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative" style={{ 
      background: '#0a0a0a',
      position: 'relative'
    }}>
      <TokenRain isActive={showTokenRain} onComplete={handleRainComplete} />
      
      <div className="w-full flex flex-col items-center justify-center relative z-10">
        <header className="text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={MAIN_LOGO}
              alt="GoldenPuF NFT"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-pulse-subtle token-image drop-shadow-2xl"
              style={{ background: 'transparent' }}
            />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight">
                GoldenPuF NFT
              </h1>
            </div>
          </div>
          
          {!walletAddress && (
            <div className="mt-8 flex justify-center">
              <div className="glass-card p-8 rounded-2xl max-w-md w-full border-2 border-yellow-500/30 shadow-2xl backdrop-blur-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2">{t('welcome')}</h2>
                  <p className="text-muted-foreground">{t('connectWallet')}</p>
                </div>
                <WalletConnect onConnect={handleWalletConnect} />
              </div>
            </div>
          )}
        </header>

        {walletAddress && (
          <>
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('connectedWallet')}</p>
                  <p className="font-mono text-yellow-500">{walletAddress}</p>
                </div>
                <button
                  onClick={handleWalletDisconnect}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                  title="Отключить кошелек"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Отключить</span>
                </button>
              </div>
              
              {worldIdUser?.verified && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">{t('worldIdVerified')}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 w-full max-w-7xl px-4">
              <div className="lg:col-span-3">
                <DailyReward 
                  walletAddress={walletAddress} 
                  onClaim={handleRewardClaim}
                  userPoints={userPoints}
                />
              </div>
            </div>

            <div className="w-full max-w-7xl px-4">
              <TokenInfo />
              <GoldenPUFChart />
              <TokenButtons />
              
              <div className="mt-8 flex justify-center">
                <div className="max-w-md w-full">
                  <TelegramInfo />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
