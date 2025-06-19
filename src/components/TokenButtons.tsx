
import { ShoppingCart, Clock, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-500">{t('tokenTitle')}</h3>
        <div className="p-4 bg-secondary bg-opacity-30 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Total Points Available: 10 Million
            </p>
            <p className="text-xs text-muted-foreground">
              Points will be converted to real tokens on World Chain and listed on decentralized exchanges. Collect points now!
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-medium transition-colors cursor-not-allowed opacity-75 justify-center"
          disabled
        >
          <Clock className="w-5 h-5" />
          {t('stakingComingSoon')}
        </button>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg text-lg font-medium transition-colors cursor-not-allowed opacity-75 justify-center"
          disabled
        >
          <ArrowLeftRight className="w-5 h-5" />
          {t('swapComingSoon')}
        </button>
      </div>
    </div>
  );
};

export default TokenButtons;
