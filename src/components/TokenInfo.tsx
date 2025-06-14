
import { ExternalLink, ShoppingCart } from 'lucide-react';

const TokenInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
          alt="GoldenPUF Token"
          className="w-32 h-32 token-image"
        />
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">GoldenPUF</h2>
          <p className="text-muted-foreground">World Chain Ecosystem Token</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-secondary bg-opacity-30 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Supply</h3>
          <p className="text-xl font-semibold text-yellow-500">10,000,000 PUF</p>
        </div>
        <div className="p-4 bg-secondary bg-opacity-30 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contract Address</h3>
          <a
            href="https://dexscreener.com/worldchain/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-500 hover:text-yellow-400 flex items-center gap-1 break-all mb-2"
          >
            0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
          <a
            href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg text-sm font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Купить токен
          </a>
        </div>
      </div>
      
      <div className="bg-secondary bg-opacity-30 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-500">About GoldenPUF Points</h3>
        <p className="text-sm text-muted-foreground">
          Earn daily points that will be converted to GoldenPUF tokens on World Chain. 
          Total supply is limited to 10 million tokens. Connect your World Chain wallet 
          and claim your daily reward every 24 hours!
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
