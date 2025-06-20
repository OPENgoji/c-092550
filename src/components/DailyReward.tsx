
import { useState, useEffect } from 'react';
import { Gift, Clock, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

const DailyReward = ({ 
  walletAddress, 
  onClaim, 
  userTokens 
}: { 
  walletAddress: string; 
  onClaim: () => void;
  userTokens: number;
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [canClaim, setCanClaim] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Check if user has premium subscription
  const hasPremium = localStorage.getItem(`premium_${walletAddress}`) === 'true';
  const rewardAmount = hasPremium ? 100 : 1;

  useEffect(() => {
    const lastClaim = localStorage.getItem(`lastClaim_${walletAddress}`);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastClaim || now - parseInt(lastClaim) >= twentyFourHours) {
      setCanClaim(true);
    } else {
      const nextClaim = parseInt(lastClaim) + twentyFourHours;
      const timer = setInterval(() => {
        const remaining = nextClaim - Date.now();
        if (remaining <= 0) {
          setCanClaim(true);
          setTimeLeft('');
          clearInterval(timer);
        } else {
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [walletAddress]);

  const handleClaim = async () => {
    if (!canClaim || isClicking) return;
    
    setIsClicking(true);
    
    try {
      toast({
        title: "🎁 Claiming reward...",
        description: `Processing your daily reward of ${rewardAmount} tokens`,
      });

      localStorage.setItem(`lastClaim_${walletAddress}`, Date.now().toString());
      setCanClaim(false);
      
      onClaim();
      
      setTimeout(() => {
        toast({
          title: "✅ Reward claimed!",
          description: `${rewardAmount} tokens have been successfully added`,
        });
      }, 500);
      
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: "❌ Error",
        description: "Failed to claim reward. Please try again.",
        variant: "destructive"
      });
      setCanClaim(true);
    } finally {
      setTimeout(() => {
        setIsClicking(false);
      }, 1000);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
        <Gift className="w-5 h-5 text-yellow-500" />
        Daily special points
      </h3>
      
      {/* User tokens display */}
      <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-muted-foreground">Your Points</span>
        </div>
        <p className="text-2xl font-bold text-yellow-500">{userTokens.toLocaleString()}</p>
        <p className="text-sm text-yellow-400">→ $GPT</p>
      </div>
      
      {hasPremium && (
        <div className="mb-4 p-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-400 font-semibold">
            ⭐ Premium Active - Earning {rewardAmount} tokens daily!
          </p>
        </div>
      )}
      
      {canClaim ? (
        <button
          onClick={handleClaim}
          disabled={isClicking}
          className={`px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl text-lg relative ${
            isClicking ? 'opacity-70 cursor-not-allowed transform scale-95' : 'hover:transform hover:scale-105'
          }`}
        >
          {isClicking ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Claiming...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-5 h-5" />
              {t('claimNow')} ({rewardAmount} tokens)
            </div>
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Clock className="w-4 h-4 text-yellow-500" />
          <p className="text-xs text-muted-foreground">Next tokens in:</p>
          <p className="text-sm font-mono text-yellow-500">{timeLeft}</p>
        </div>
      )}
    </div>
  );
};

export default DailyReward;
