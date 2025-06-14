
import { ExternalLink } from 'lucide-react';

const TokenInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/lovable-uploads/ad787e15-5730-4794-bb13-51b5e117eff5.png"
          alt="GoldenPUF Token"
          className="w-24 h-24 rounded-full token-image"
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
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Contract Address</h3>
          <a
            href="https://dexscreener.com/worldchain/0xEde38e5b74d2fD1b2213eD880819FF95758f02f7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
          >
            0xEde38e5b74d2fD1b2213eD880819FF95758f02f7
            <ExternalLink className="w-3 h-3" />
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
