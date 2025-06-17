
import { useState, useEffect } from 'react';
import { Wallet, Globe } from 'lucide-react';
import WorldIDVerification from './WorldIDVerification';
import { WorldIDVerificationResult, WorldIDUser } from '@/types/worldid';
import { useTranslation } from '@/hooks/useTranslation';
import { MiniKit } from '@worldcoin/minikit-js';

interface WalletConnectProps {
  onConnect: (address: string, worldIdUser?: WorldIDUser) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { t } = useTranslation();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWorldIdVerified, setIsWorldIdVerified] = useState(false);
  const [worldIdData, setWorldIdData] = useState<WorldIDVerificationResult | null>(null);

  // Initialize MiniKit
  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      console.log("MiniKit is not installed. Please open in World App.");
    }
  }, []);

  // Check saved verification on load
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
      // Use MiniKit for wallet connection if available
      if (MiniKit.isInstalled()) {
        try {
          const { commandPayload, finalPayload } = await MiniKit.commandsAsync.walletAuth({
            nonce: Math.random().toString(36).substring(7),
            requestId: Math.random().toString(36).substring(7),
            expirationTime: new Date(Date.now() + 60000),
            notBefore: new Date(),
            statement: "Connect to GoldenPUF NFT"
          });

          if (finalPayload && finalPayload.address) {
            const address = finalPayload.address;
            const worldIdUser: WorldIDUser = {
              verified: isWorldIdVerified,
              nullifier_hash: worldIdData?.nullifier_hash,
              verification_level: worldIdData?.verification_level,
              created_at: new Date().toISOString()
            };
            onConnect(address, worldIdUser);
            return;
          }
        } catch (error) {
          console.error('MiniKit wallet connection failed:', error);
        }
      }

      // Fallback for Web3
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
        // Demo fallback
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
          <Globe className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-yellow-400">{t('worldChainIntegration')}</h3>
        </div>
        <p className="text-sm text-muted-foreground">
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
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
      >
        <Wallet className="w-6 h-6" />
        {isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            {t('connectingToWorldChain')}
          </>
        ) : (
          t('connectWorldChainWallet')
        )}
      </button>

      {isWorldIdVerified && (
        <div className="text-center text-sm text-green-400 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          {t('worldIdActive')}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
