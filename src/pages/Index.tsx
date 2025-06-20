
import { useState, useEffect } from 'react';
import WalletConnect from "@/components/WalletConnect";
import TokenButtons from "@/components/TokenButtons";
import TokenPool from "@/components/TokenPool";
import DailyReward from "@/components/DailyReward";
import PremiumSubscription from "@/components/PremiumSubscription";
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
  const [userTokens, setUserTokens] = useState<number>(0);

  const handleWalletConnect = (address: string, worldId?: WorldIDUser) => {
    setWalletAddress(address);
    setWorldIdUser(worldId || null);
    
    const userData = PointsStorage.getUserPointsData(address);
    setUserTokens(userData?.points || 0);
    
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
    setUserTokens(0);
    setShowTokenRain(false);
    
    localStorage.removeItem('lastConnectedWallet');
    localStorage.removeItem('worldid_verification');
    localStorage.removeItem('worldid_verification_backup');
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('worldid_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const handleRewardClaim = () => {
    console.log("Reward claim triggered, showing token rain");
    setShowTokenRain(true);
    
    const hasPremium = localStorage.getItem(`premium_${walletAddress}`) === 'true';
    const rewardMultiplier = worldIdUser?.verified ? 2 : 1;
    const baseReward = hasPremium ? 100 : 1;
    const rewardAmount = baseReward * rewardMultiplier;
    const newTokens = userTokens + rewardAmount;
    
    setUserTokens(newTokens);
    
    PointsStorage.saveUserPoints(walletAddress, newTokens, worldIdUser);
    
    // Dispatch custom event to update token pool
    window.dispatchEvent(new Event('pointsUpdated'));
  };

  const handleRainComplete = () => {
    console.log("Token rain completed");
    setShowTokenRain(false);
  };

  useEffect(() => {
    const lastWallet = localStorage.getItem('lastConnectedWallet');
    if (lastWallet) {
      setWalletAddress(lastWallet);
      const userData = PointsStorage.getUserPointsData(lastWallet);
      setUserTokens(userData?.points || 0);
      
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

  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('lastConnectedWallet', walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      <TokenRain isActive={showTokenRain} onComplete={handleRainComplete} />
      
      <div className="w-full flex flex-col items-center justify-center relative z-10">
        <header className="text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src={MAIN_LOGO}
              alt="Golden PUF Token"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-pulse-subtle token-image drop-shadow-2xl"
              style={{ background: 'transparent' }}
            />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
                Golden PUF Token
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-yellow-400 mt-2">$GPT</p>
            </div>
          </div>
          
          {!walletAddress && (
            <div className="mt-8 flex justify-center">
              <div className="glass-card-welcome p-8 rounded-2xl max-w-md w-full border-2 border-yellow-500/30 shadow-2xl backdrop-blur-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-yellow-200 mb-2">{t('welcome')}</h2>
                  <p className="text-yellow-300">{t('connectWallet')}</p>
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
                  <p className="text-sm text-yellow-300 mb-1">{t('connectedWallet')}</p>
                  <p className="font-mono text-yellow-400">{walletAddress}</p>
                </div>
                <button
                  onClick={handleWalletDisconnect}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600/30 hover:bg-red-600/40 border border-red-500/40 rounded-lg text-red-300 hover:text-red-200 transition-colors"
                  title={t('disconnect')}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{t('disconnect')}</span>
                </button>
              </div>
              
              {worldIdUser?.verified && (
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-600/30 border border-green-500/40 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-300 text-sm">{t('worldIdVerified')}</span>
                </div>
              )}
            </div>

            <div className="w-full max-w-7xl px-4">
              <TokenPool />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <DailyReward 
                    walletAddress={walletAddress} 
                    onClaim={handleRewardClaim}
                    userTokens={userTokens}
                  />
                </div>
                <div>
                  <PremiumSubscription walletAddress={walletAddress} />
                </div>
              </div>

              <TokenButtons />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
