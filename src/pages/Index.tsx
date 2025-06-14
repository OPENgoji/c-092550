
import { useState } from 'react';
import WalletConnect from "@/components/WalletConnect";
import TokenInfo from "@/components/TokenInfo";
import GoldenPUFChart from "@/components/GoldenPUFChart";
import DailyReward from "@/components/DailyReward";
import TelegramInfo from "@/components/TelegramInfo";
import TokenRain from "@/components/TokenRain";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [showTokenRain, setShowTokenRain] = useState(false);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleRewardClaim = () => {
    setShowTokenRain(true);
  };

  const handleRainComplete = () => {
    setShowTokenRain(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-yellow-900/10 to-black p-4 md:p-8">
      <TokenRain isActive={showTokenRain} onComplete={handleRainComplete} />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/lovable-uploads/ad787e15-5730-4794-bb13-51b5e117eff5.png"
              alt="GoldenPUF"
              className="w-16 h-16 rounded-full animate-pulse-subtle"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                GoldenPUF SWAP
              </h1>
              <p className="text-muted-foreground">World Chain Ecosystem Platform</p>
            </div>
          </div>
          
          {!walletAddress && (
            <div className="mt-8">
              <WalletConnect onConnect={handleWalletConnect} />
            </div>
          )}
        </header>

        {walletAddress && (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Connected Wallet:</p>
              <p className="font-mono text-yellow-500">{walletAddress}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <DailyReward walletAddress={walletAddress} onClaim={handleRewardClaim} />
              </div>
              <div>
                <TelegramInfo />
              </div>
            </div>

            <TokenInfo />
            <GoldenPUFChart />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
