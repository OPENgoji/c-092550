
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenCounter = ({ tokens }: { tokens: number }) => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed top-4 right-4 z-40 glass-card p-4 rounded-lg border-2 border-yellow-500/30">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        <div className="text-center">
          <p className="text-xs text-muted-foreground">{t('myTokens')}</p>
          <p className="text-lg font-bold text-yellow-500">{tokens.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenCounter;
