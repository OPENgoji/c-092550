
import { useState } from 'react';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { WorldIDVerificationResult } from '@/types/worldid';

interface WorldIDVerificationProps {
  onVerify: (result: WorldIDVerificationResult) => void;
  isVerified: boolean;
}

const WorldIDVerification = ({ onVerify, isVerified }: WorldIDVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string>('');

  // Правильные параметры для World Chain
  const APP_ID = "app_staging_15daccf5b7d4ec9b7dbba044a8fdeab5"; // Используем staging версию
  const ACTION = "verify-golden-puf-user";

  const handleVerify = async (result: ISuccessResult) => {
    console.log("World ID verification successful:", result);
    setIsVerifying(false);
    setVerificationError('');
    
    const verificationData: WorldIDVerificationResult = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      verification_level: result.verification_level
    };
    
    // Сохраняем результат верификации в localStorage для персистентности
    localStorage.setItem('worldid_verification', JSON.stringify(verificationData));
    
    onVerify(verificationData);
  };

  const onError = (error: any) => {
    console.error("World ID verification failed:", error);
    setIsVerifying(false);
    setVerificationError(error.message || 'Verification failed');
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
      <IDKitWidget
        app_id={APP_ID}
        action={ACTION}
        signal=""
        onSuccess={handleVerify}
        onError={onError}
        verification_level={VerificationLevel.Orb}
        enableTelemetry
      >
        {({ open }) => (
          <button
            onClick={() => {
              setIsVerifying(true);
              setVerificationError('');
              open();
            }}
            disabled={isVerifying}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 w-full justify-center"
          >
            <Shield className="w-5 h-5" />
            {isVerifying ? 'Verifying...' : 'Verify with World ID'}
          </button>
        )}
      </IDKitWidget>

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
