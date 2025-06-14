
import { useState } from 'react';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { Shield, CheckCircle } from 'lucide-react';
import { WorldIDVerificationResult } from '@/types/worldid';

interface WorldIDVerificationProps {
  onVerify: (result: WorldIDVerificationResult) => void;
  isVerified: boolean;
}

const WorldIDVerification = ({ onVerify, isVerified }: WorldIDVerificationProps) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (result: ISuccessResult) => {
    console.log("World ID verification successful:", result);
    setIsVerifying(false);
    
    const verificationData: WorldIDVerificationResult = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      verification_level: result.verification_level
    };
    
    onVerify(verificationData);
  };

  const onError = (error: any) => {
    console.error("World ID verification failed:", error);
    setIsVerifying(false);
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-green-400 font-medium">World ID Verified</span>
      </div>
    );
  }

  return (
    <IDKitWidget
      app_id="app_15daccf5b7d4ec9b7dbba044a8fdeab5"
      action="verify-golden-puf-user"
      signal=""
      onSuccess={handleVerify}
      onError={onError}
      verification_level={VerificationLevel.Orb}
    >
      {({ open }) => (
        <button
          onClick={() => {
            setIsVerifying(true);
            open();
          }}
          disabled={isVerifying}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
        >
          <Shield className="w-5 h-5" />
          {isVerifying ? 'Verifying...' : 'Verify with World ID'}
        </button>
      )}
    </IDKitWidget>
  );
};

export default WorldIDVerification;
