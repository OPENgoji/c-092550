
import { ExternalLink, TrendingUp, Users, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenInfo = () => {
  const { t } = useTranslation();

  const tokenStats = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      label: "Total Points System",
      value: "100M → 14M",
      description: "86% burn planned"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      label: "Daily Rewards",
      value: "1-2 Points",
      description: "2x with World ID"
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      label: "Future Conversion",
      value: "NFT Collection",
      description: "Exclusive World Chain NFTs"
    }
  ];

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <img
          src="/lovable-uploads/a8e8291a-531a-42d0-b99a-151de202bf83.png"
          alt="GoldenPUF Token"
          className="w-8 h-8 rounded-full"
        />
        <h3 className="text-xl font-bold text-yellow-400">GoldenPUF Token ($GPUF)</h3>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Contract Address:</span>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-black/30 px-2 py-1 rounded">
              0xB7b9...5D1890e1Dd
            </code>
            <a
              href="https://worldscan.org/address/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Network:</span>
          <span className="text-green-400 font-medium">World Chain (480)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokenStats.map((stat, index) => (
          <div key={index} className="bg-black/20 p-4 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className="font-bold text-white">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
        <p className="text-sm text-yellow-200 text-center">
          🔥 <strong>Massive Burn Event:</strong> 86 million points will be burned, leaving only 14 million for NFT conversion!
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
