
import { useState, useEffect } from 'react';
import { Wallet, Globe } from 'lucide-react';
import WorldIDVerification from './WorldIDVerification';
import { WorldIDVerificationResult, WorldIDUser } from '@/types/worldid';
import { useTranslation } from '@/hooks/useTranslation';
import { MiniKit } from '@worldcoin/minikit-js';

interface WalletConnectProps {
  onConnect: (address: string, worldIdUser?: WorldIDUser) => void;
}

interface WalletAuthPayload {
  address: string;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { t } = useTranslation();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWorldIdVerified, setIsWorldIdVerified] = useState(false);
  const [worldIdData, setWorldIdData] = useState<WorldIDVerificationResult | null>(null);

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      console.log("MiniKit is not installed. Please open in World App.");
    }
  }, []);

  useEffect(() => {
    const savedVerification = localStorage.getItem('worldid_verification');
    if (savedVerification) {
      try {
        const data = JSON.parse(savedVerification);
        setWorldIdData(data);
        setIsWorldIdVerified(true);
      } catch (error) {
        console.error('Error parsing saved World ID verification:', error);
        const backupVerification = localStorage.getItem('worldid_verification_backup');
        if (backupVerification) {
          try {
            const backupData = JSON.parse(backupVerification);
            setWorldIdData(backupData);
            setIsWorldIdVerified(true);
          } catch (backupError) {
            console.error('Backup verification also corrupted:', backupError);
          }
        }
      }
    }
  }, []);

  const handleWorldIDVerify = (result: WorldIDVerificationResult) => {
    console.log("World ID verified:", result);
    setWorldIdData(result);
    setIsWorldIdVerified(true);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      if (MiniKit.isInstalled()) {
        try {
          const result = await MiniKit.commandsAsync.walletAuth({
            nonce: Math.random().toString(36).substring(7),
            requestId: Math.random().toString(36).substring(7),
            expirationTime: new Date(Date.now() + 60000),
            notBefore: new Date(),
            statement: "Connect to Golden PUF Token"
          });

          console.log("MiniKit wallet auth result:", result);

          if (result.finalPayload) {
            const payload = result.finalPayload as WalletAuthPayload;
            if (payload.address) {
              const address = payload.address;
              const worldIdUser: WorldIDUser = {
                verified: isWorldIdVerified,
                nullifier_hash: worldIdData?.nullifier_hash,
                verification_level: worldIdData?.verification_level,
                created_at: new Date().toISOString()
              };
              onConnect(address, worldIdUser);
              return;
            }
          }
        } catch (error) {
          console.error('MiniKit wallet connection failed:', error);
        }
      }

      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          const worldIdUser: WorldIDUser = {
            verified: isWorldIdVerified,
            nullifier_hash: worldIdData?.nullifier_hash,
            verification_level: worldIdData?.verification_level,
            created_at: new Date().toISOString()
          };
          onConnect(address, worldIdUser);
        }
      } else {
        setTimeout(() => {
          const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
          const worldIdUser: WorldIDUser = {
            verified: isWorldIdVerified,
            nullifier_hash: worldIdData?.nullifier_hash,
            verification_level: worldIdData?.verification_level,
            created_at: new Date().toISOString()
          };
          onConnect(mockAddress, worldIdUser);
        }, 1500);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-semibold text-yellow-300">{t('worldChainIntegration')}</h3>
        </div>
        <p className="text-sm text-yellow-200">
          {t('worldChainDescription')}
        </p>
      </div>

      <WorldIDVerification 
        onVerify={handleWorldIDVerify}
        isVerified={isWorldIdVerified}
      />

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-yellow-600/80 hover:bg-yellow-600/90 text-yellow-100 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70 backdrop-blur-sm border border-yellow-500/50"
      >
        <Wallet className="w-6 h-6" />
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-100"></div>
            {t('connectingToWorldChain')}
          </>
        ) : (
          t('connectWorldChainWallet')
        )}
      </button>

      {isWorldIdVerified && (
        <div className="text-center text-sm text-green-400 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          {t('worldIdActive')}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
