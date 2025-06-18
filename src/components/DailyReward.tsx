
import { useState, useEffect } from 'react';
import { Gift, Clock, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

const DailyReward = ({ 
  walletAddress, 
  onClaim, 
  userPoints 
}: { 
  walletAddress: string; 
  onClaim: () => void;
  userPoints: number;
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [canClaim, setCanClaim] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

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
      // Show processing toast in English
      toast({
        title: "🎁 Claiming reward...",
        description: "Processing your daily reward",
      });

      // Save last claim time
      localStorage.setItem(`lastClaim_${walletAddress}`, Date.now().toString());
      setCanClaim(false);
      
      // Call callback to update points
      onClaim();
      
      // Show success notification
      setTimeout(() => {
        toast({
          title: "✅ Reward claimed!",
          description: "Your points have been successfully added",
        });
      }, 500);
      
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: "❌ Error",
        description: "Failed to claim reward. Please try again.",
        variant: "destructive"
      });
      // Restore claim ability on error
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
        {t('dailyReward')}
      </h3>
      
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
              {t('claimNow')}
            </div>
          )}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Clock className="w-4 h-4 text-yellow-500" />
          <p className="text-xs text-muted-foreground">{t('nextReward')}</p>
          <p className="text-sm font-mono text-yellow-500">{timeLeft}</p>
          
          <div className="mt-2 p-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{t('myPoints')}</p>
              <p className="text-sm font-bold text-yellow-500">{userPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReward;
