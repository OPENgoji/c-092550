
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
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
              alt="GoldenPUF"
              className="w-40 h-40 animate-pulse-subtle token-image mb-4"
            />
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                GoldenPUF SWAP
              </h1>
              <p className="text-muted-foreground text-lg">World Chain Ecosystem Platform</p>
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
