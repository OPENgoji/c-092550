
import { Star } from 'lucide-react';

const PointsCounter = ({ points }: { points: number }) => {
  return (
    <div className="fixed top-4 right-4 z-40 glass-card p-4 rounded-lg border-2 border-yellow-500/30">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Мои специальные NFT</p>
          <p className="text-lg font-bold text-yellow-500">{points.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PointsCounter;
