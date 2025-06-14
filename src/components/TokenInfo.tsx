
import { ExternalLink } from 'lucide-react';

const TokenInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">GoldenPUF NFT</h2>
        <p className="text-muted-foreground">World Chain NFT Collection Token</p>
      </div>
      
      <div className="bg-secondary bg-opacity-30 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-3 text-yellow-500">Информация о поинтах</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Зарабатывайте ежедневные поинты, которые будут конвертированы в эксклюзивную NFT коллекцию на World Chain. 
          Подключите свой World Chain кошелек и получайте ежедневную награду каждые 24 часа!
        </p>
        
        <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg mb-4">
          <p className="text-sm text-center mb-2">
            <span className="text-2xl">🔥</span>
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Планируется масштабное сжигание из <span className="text-yellow-400 font-bold">100 миллионов поинтов</span>
            <br />
            будет сожжено <span className="text-red-400 font-bold">84%</span> поинтов
            <br />
            Останется только <span className="text-green-400 font-bold">16 миллионов NFT поинтов</span>
          </p>
          <p className="text-center text-lg mt-2">🚀💎</p>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Эти поинты в будущем могут превратиться в что-то особенное! ✨
          Продолжайте собирать и следите за обновлениями проекта.
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
