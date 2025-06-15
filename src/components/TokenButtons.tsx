
import { ExternalLink, Clock, Repeat } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenButtons = () => {
  const { t } = useTranslation();

  const handleBuyToken = () => {
    window.open(
      'https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Buy Token Button */}
      <button
        onClick={handleBuyToken}
        className="glass-card p-6 rounded-xl border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-3">
          <ExternalLink className="w-6 h-6 text-green-500" />
          <span className="font-bold text-green-400">{t('buyToken')}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Purchase GoldenPUF tokens directly through World App platform
        </p>
        <div className="mt-3 text-xs text-green-300 group-hover:text-green-200">
          → Open in World App
        </div>
      </button>

      {/* Staking - Coming Soon */}
      <div className="glass-card p-6 rounded-xl border-2 border-orange-500/30 opacity-60">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-6 h-6 text-orange-500" />
          <span className="font-bold text-orange-400">Staking</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Earn more $GPUF by staking your GoldenPUF tokens. Boost your rewards!
        </p>
        <div className="mt-3 text-xs text-orange-300">
          Coming soon for GoldenPUF ⏳
        </div>
      </div>

      {/* Mining - Coming Soon */}
      <div className="glass-card p-6 rounded-xl border-2 border-blue-500/30 opacity-60">
        <div className="flex items-center gap-3 mb-3">
          <Repeat className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-blue-400">Mining</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Mine $GPUF and unlock new DeFi features with our upcoming mining tools.
        </p>
        <div className="mt-3 text-xs text-blue-300">
          Mining for GoldenPUF coming soon ⏳
        </div>
      </div>
    </div>
  );
};

export default TokenButtons;
