
import { Clock, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
  );
};

export default TokenButtons;
