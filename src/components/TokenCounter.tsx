
import { Star } from 'lucide-react';

const TokenCounter = ({ tokens }: { tokens: number }) => {
  return (
    <div className="fixed top-4 right-4 z-40 glass-card p-4 rounded-lg border-2 border-yellow-500/30">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Your Points</p>
          <p className="text-lg font-bold text-yellow-500">{tokens.toLocaleString()}</p>
          <p className="text-xs text-yellow-400">→ $GPT</p>
        </div>
      </div>
    </div>
  );
};

export default TokenCounter;
