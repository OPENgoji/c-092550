
import { ExternalLink } from 'lucide-react';

const TokenInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
          alt="GoldenPUF NFT Token"
          className="w-32 h-32 token-image"
        />
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">GoldenPUF NFT</h2>
          <p className="text-muted-foreground">World Chain NFT Collection Token</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <div className="p-4 bg-secondary bg-opacity-30 rounded-lg">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Общее количество специальных NFT</h3>
          <p className="text-xl font-semibold text-yellow-500">100,000,000 специальных NFT</p>
        </div>
      </div>
      
      <div className="bg-secondary bg-opacity-30 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-3 text-yellow-500">Распределение специальных NFT</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
            <h4 className="font-semibold text-yellow-400 mb-1">100,000,000 специальных NFT</h4>
            <p className="text-sm text-muted-foreground">Конвертируются в эксклюзивную NFT коллекцию</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Зарабатывайте ежедневные специальные NFT, которые будут конвертированы в эксклюзивную NFT коллекцию на World Chain. 
          Подключите свой World Chain кошелек и получайте ежедневную награду каждые 24 часа!
        </p>
      </div>

      <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20 mb-4">
        <h3 className="text-lg font-semibold mb-3 text-red-400 flex items-center gap-2">
          🚀🔥 Планируемое сжигание NFT
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          В дальнейшем планируется сжигание <span className="text-red-400 font-bold">67%</span> от общего количества NFT, 
          что значительно увеличит редкость и ценность оставшихся токенов.
        </p>
        <p className="text-xs text-red-300">
          Это сделает вашу NFT коллекцию еще более эксклюзивной! 🚀🔥
        </p>
      </div>

      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
        <h3 className="text-lg font-semibold mb-3 text-purple-400 flex items-center gap-2">
          ✨ Будущие возможности
        </h3>
        <p className="text-sm text-muted-foreground">
          Эти поинты в будущем могут превратиться в что-то особенное! ✨
          Продолжайте собирать и следите за обновлениями проекта.
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
