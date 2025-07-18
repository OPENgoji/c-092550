
import { useState } from 'react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { WorldIDVerificationResult } from '@/types/worldid';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';

interface WorldIDVerificationProps {
  onVerify: (result: WorldIDVerificationResult) => void;
  isVerified: boolean;
}

// Define the expected payload structure
interface WorldIDPayload {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: string;
}

const WorldIDVerification = ({ onVerify, isVerified }: WorldIDVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string>('');

  const APP_ID = "app_staging_15daccf5b7d4ec9b7dbba044a8fdeab5";
  const ACTION = "verify-golden-puf-user";

  const handleVerifyWithMiniKit = async () => {
    if (!MiniKit.isInstalled()) {
      setVerificationError('Please open this app in World App');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');

    try {
      const result = await MiniKit.commandsAsync.verify({
        action: ACTION,
        verification_level: VerificationLevel.Orb
      });

      console.log("MiniKit verify result:", result);

      if (!result.finalPayload) {
        throw new Error("Verification failed - no response");
      }

      // Type cast the payload to our expected structure
      const finalPayload = result.finalPayload as WorldIDPayload;
      
      // Check if verification was successful
      if (!finalPayload.merkle_root || !finalPayload.nullifier_hash || !finalPayload.proof) {
        throw new Error("Verification failed - incomplete data");
      }

      const verificationData: WorldIDVerificationResult = {
        merkle_root: finalPayload.merkle_root,
        nullifier_hash: finalPayload.nullifier_hash,
        proof: finalPayload.proof,
        verification_level: finalPayload.verification_level || 'orb'
      };

      // Save verification with backup
      try {
        localStorage.setItem('worldid_verification', JSON.stringify(verificationData));
        localStorage.setItem(`worldid_backup_${Date.now()}`, JSON.stringify(verificationData));
        
        const backupData = {
          ...verificationData,
          timestamp: Date.now(),
          version: '1.0'
        };
        localStorage.setItem('worldid_verification_backup', JSON.stringify(backupData));
      } catch (error) {
        console.error('Failed to save World ID verification:', error);
      }

      onVerify(verificationData);
    } catch (error: any) {
      console.error("World ID verification failed:", error);
      setVerificationError(error.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-green-400 font-medium">World ID Verified ✓</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleVerifyWithMiniKit}
        disabled={isVerifying}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 w-full justify-center"
      >
        <Shield className="w-5 h-5" />
        {isVerifying ? 'Verifying...' : 'Verify with World ID'}
      </button>

      {verificationError && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-red-400 text-sm">{verificationError}</span>
        </div>
      )}
    </div>
  );
};

export default WorldIDVerification;
