
import { ExternalLink, ShoppingCart, Clock, Copy, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenButtons = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const contractAddress = "0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-500">{t('tokenTitle')}</h3>
        <div className="p-4 bg-secondary bg-opacity-30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">{t('contractAddress')}</span>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-black rounded transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-yellow-400 break-all">
              {contractAddress}
            </span>
            <a
              href="https://dexscreener.com/worldchain/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
              title={t('openDexScreener')}
            >
              <ExternalLink className="w-3 h-3" />
              <span className="text-xs">DEX Screener</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-medium transition-colors justify-center"
        >
          <ShoppingCart className="w-5 h-5" />
          {t('buyToken')}
        </a>
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
