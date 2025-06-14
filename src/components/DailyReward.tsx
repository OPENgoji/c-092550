
import { useState, useEffect } from 'react';
import { Gift, Clock } from 'lucide-react';

const DailyReward = ({ walletAddress, onClaim }: { walletAddress: string; onClaim: () => void }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [canClaim, setCanClaim] = useState(false);

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

  const handleClaim = () => {
    localStorage.setItem(`lastClaim_${walletAddress}`, Date.now().toString());
    setCanClaim(false);
    onClaim();
  };

  return (
    <div className="glass-card p-6 rounded-lg text-center">
      <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
        <Gift className="w-6 h-6 text-yellow-500" />
        Daily Reward
      </h3>
      
      {canClaim ? (
        <button
          onClick={handleClaim}
          className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          Claim 1 GoldenPUF Point
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Clock className="w-8 h-8 text-yellow-500" />
          <p className="text-muted-foreground">Next reward in:</p>
          <p className="text-2xl font-mono text-yellow-500">{timeLeft}</p>
        </div>
      )}
    </div>
  );
};

export default DailyReward;
