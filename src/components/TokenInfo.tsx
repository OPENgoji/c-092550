
import { ExternalLink } from 'lucide-react';

const TokenInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">GoldenPUF NFT</h2>
        <p className="text-muted-foreground">World Chain NFT Collection Token</p>
      </div>
      
      <div className="p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg mb-4">
        <h3 className="text-base font-semibold mb-2 text-yellow-500 text-center">Информация о поинтах</h3>
        
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Зарабатывайте ежедневные поинты, которые будут конвертированы в эксклюзивную NFT коллекцию на World Chain. 
          Подключите свой World Chain кошелек и получайте ежедневную награду каждые 24 часа!
        </p>
        
        <div className="text-center mb-3">
          <p className="text-sm text-muted-foreground">
            Планируется масштабное сжигание из <span className="text-yellow-400 font-bold">100 миллионов поинтов</span>
            <br />
            будет сожжено <span className="text-red-400 font-bold">86 миллионов поинтов (86%)</span>
            <br />
            Останется только <span className="text-green-400 font-bold">14 миллионов NFT поинтов</span>
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Эти поинты в будущем могут превратиться в что-то особенное! ✨
          Продолжайте собирать и следите за обновлениями проекта.
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
