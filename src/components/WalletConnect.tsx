
import { useState } from 'react';
import { Wallet } from 'lucide-react';
import WorldIDVerification from './WorldIDVerification';
import { WorldIDVerificationResult, WorldIDUser } from '@/types/worldid';

interface WalletConnectProps {
  onConnect: (address: string, worldIdUser?: WorldIDUser) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWorldIdVerified, setIsWorldIdVerified] = useState(false);
  const [worldIdData, setWorldIdData] = useState<WorldIDVerificationResult | null>(null);

  const handleWorldIDVerify = (result: WorldIDVerificationResult) => {
    console.log("World ID verified:", result);
    setWorldIdData(result);
    setIsWorldIdVerified(true);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    // Симуляция подключения кошелька World Chain
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
      const worldIdUser: WorldIDUser = {
        verified: isWorldIdVerified,
        nullifier_hash: worldIdData?.nullifier_hash,
        verification_level: worldIdData?.verification_level
      };
      onConnect(mockAddress, worldIdUser);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">Верификация и подключение</h3>
        <p className="text-sm text-muted-foreground">
          Для получения максимальных наград рекомендуется верификация через World ID
        </p>
      </div>

      <WorldIDVerification 
        onVerify={handleWorldIDVerify}
        isVerified={isWorldIdVerified}
      />

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
      >
        <Wallet className="w-6 h-6" />
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            Подключение...
          </>
        ) : (
          'Connect World Chain Wallet'
        )}
      </button>

      {isWorldIdVerified && (
        <div className="text-center text-sm text-green-400">
          ✓ World ID верификация пройдена - получайте больше наград!
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
