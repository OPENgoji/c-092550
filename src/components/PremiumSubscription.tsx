
import { useState } from 'react';
import { Star, CreditCard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PremiumSubscription = ({ walletAddress }: { walletAddress: string }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasPremium = localStorage.getItem(`premium_${walletAddress}`) === 'true';

  const RECIPIENT_ADDRESS = '0x4efd0575242c6c8414dfc2a8d06d3b38640a7dd3';
  const WLD_TOKEN_ADDRESS = '0x2cFc85d8E48F8EAB294be644d9E25C3030863003';
  const PREMIUM_COST = '10'; // 10 WLD

  const handlePremiumPurchase = async () => {
    if (isProcessing || hasPremium) return;
    
    setIsProcessing(true);
    
    try {
      toast({
        title: "🔄 Processing payment...",
        description: "Please confirm the transaction in your wallet",
      });

      // Simulate transaction for now - in real implementation, this would interact with World Chain
      // This is where you would integrate with the actual WLD token contract
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mark user as premium
      localStorage.setItem(`premium_${walletAddress}`, 'true');
      localStorage.setItem(`premium_purchase_${walletAddress}`, Date.now().toString());
      
      toast({
        title: "🎉 Premium activated!",
        description: "You will now earn 100 tokens daily for life!",
      });
      
      // Refresh the page to update UI
      window.location.reload();
      
    } catch (error) {
      console.error('Error processing premium purchase:', error);
      toast({
        title: "❌ Payment failed",
        description: "Transaction failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPremium) {
    return (
      <div className="glass-card p-6 rounded-lg text-center border-2 border-green-500/30">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Check className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-green-400">Premium Active</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          You're earning 100 tokens daily!
        </p>
        <div className="p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-green-400">✨ Lifetime premium subscription ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
        <Star className="w-5 h-5 text-green-500" />
        Premium Subscription
      </h3>
      
      <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg">
        <div className="text-center mb-3">
          <p className="text-2xl font-bold text-green-400 mb-1">100 tokens daily</p>
          <p className="text-sm text-muted-foreground">instead of 1 token</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-yellow-400 mb-1">One-time payment: 10 WLD</p>
          <p className="text-xs text-muted-foreground">Lifetime premium access</p>
        </div>
      </div>

      <button
        onClick={handlePremiumPurchase}
        disabled={isProcessing}
        className={`w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-200 shadow-lg hover:shadow-xl text-lg ${
          isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:transform hover:scale-105'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Get 100 tokens daily for 10 WLD
          </div>
        )}
      </button>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Payment goes to: {RECIPIENT_ADDRESS.slice(0, 10)}...{RECIPIENT_ADDRESS.slice(-8)}</p>
        <p>WLD Token: {WLD_TOKEN_ADDRESS.slice(0, 10)}...{WLD_TOKEN_ADDRESS.slice(-8)}</p>
      </div>
    </div>
  );
};

export default PremiumSubscription;
