
import { useState, useEffect } from 'react';
import { TrendingDown, Users } from 'lucide-react';

const NFTCountdown = () => {
  const [totalClaimed, setTotalClaimed] = useState<number>(0);
  const totalSupply = 100000000; // 100 млн NFT
  const remaining = totalSupply - totalClaimed;

  useEffect(() => {
    // Загружаем общее количество выданных NFT из localStorage
    const getTotalClaimed = () => {
      const users = Object.keys(localStorage).filter(key => key.startsWith('userPoints_'));
      let total = 0;
      
      users.forEach(userKey => {
        try {
          const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
          if (userData.points) {
            total += userData.points;
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      });
      
      return total;
    };

    const updateClaimedCount = () => {
      const claimed = getTotalClaimed();
      setTotalClaimed(claimed);
    };

    // Обновляем при загрузке
    updateClaimedCount();

    // Обновляем каждые 5 секунд для синхронизации
    const interval = setInterval(updateClaimedCount, 5000);

    // Слушаем события изменения localStorage
    const handleStorageChange = () => {
      updateClaimedCount();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const percentageClaimed = ((totalClaimed / totalSupply) * 100).toFixed(4);

  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <h3 className="text-xl font-semibold mb-4 text-yellow-500 flex items-center gap-2">
        <TrendingDown className="w-6 h-6" />
        Статистика NFT коллекции
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-red-400">Выдано NFT</h4>
          </div>
          <p className="text-2xl font-bold text-red-500">{totalClaimed.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{percentageClaimed}% от общего</p>
        </div>
        
        <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2">Осталось NFT</h4>
          <p className="text-2xl font-bold text-green-500">{remaining.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{(100 - parseFloat(percentageClaimed)).toFixed(4)}% доступно</p>
        </div>
        
        <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
          <h4 className="font-semibold text-yellow-400 mb-2">Общий запас</h4>
          <p className="text-2xl font-bold text-yellow-500">{totalSupply.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Максимальное количество</p>
        </div>
      </div>
      
      <div className="mt-4 bg-secondary bg-opacity-30 rounded-lg p-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Прогресс распределения</span>
          <span>{percentageClaimed}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-red-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(percentageClaimed), 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Каждый выданный NFT уменьшает общий запас коллекции
        </p>
      </div>
    </div>
  );
};

export default NFTCountdown;
