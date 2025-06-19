
import { useTranslation } from '@/hooks/useTranslation';

const TokenInfo = () => {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">GoldenPUF Token</h2>
        <p className="text-muted-foreground">World Chain Token Collection</p>
      </div>
      
      <div className="p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg mb-4">
        <h3 className="text-base font-semibold mb-2 text-yellow-500 text-center">{t('tokenInfo')}</h3>
        
        <p className="text-sm text-muted-foreground mb-3 text-center">
          {t('earnDaily')}
        </p>
        
        <div className="text-center mb-3">
          <p className="text-sm text-yellow-400 font-semibold">
            Total Tokens Available: 10 Million
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Tokens will be converted to real tokens on World Chain and listed on decentralized exchanges
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Collect tokens now - they will be valuable in the future!
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
