
import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const TokenPool = () => {
  const { t } = useTranslation();
  const [totalDistributed, setTotalDistributed] = useState(0);
  const TOTAL_SUPPLY = 10000000; // 10 million tokens
  
  const calculateTotalDistributed = () => {
    let totalPoints = 0;
    const keys = Object.keys(localStorage);
    const processedWallets = new Set();
    
    // Сначала проверяем новый формат данных
    keys.forEach(key => {
      if (key.startsWith('user_data_')) {
        const walletAddress = key.replace('user_data_', '');
        if (!processedWallets.has(walletAddress)) {
          try {
            const userData = JSON.parse(localStorage.getItem(key) || '{}');
            if (userData.points && typeof userData.points === 'number') {
              totalPoints += userData.points;
              processedWallets.add(walletAddress);
              console.log(`Added ${userData.points} points from wallet ${walletAddress}`);
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
        }
      }
    });
    
    // Затем проверяем старый формат для кошельков, которые не были обработаны
    keys.forEach(key => {
      if (key.startsWith('points_') && !key.includes('backup')) {
        const walletAddress = key.replace('points_', '');
        if (!processedWallets.has(walletAddress)) {
          try {
            const points = parseInt(localStorage.getItem(key) || '0');
            if (!isNaN(points) && points > 0) {
              totalPoints += points;
              processedWallets.add(walletAddress);
              console.log(`Added ${points} points from wallet ${walletAddress} (old format)`);
            }
          } catch (error) {
            console.error('Error parsing points:', error);
          }
        }
      }
    });
    
    // Также проверяем реестр пользователей
    try {
      const registry = JSON.parse(localStorage.getItem('golden_puf_users_registry') || '{}');
      Object.keys(registry).forEach(walletAddress => {
        if (!processedWallets.has(walletAddress) && registry[walletAddress].points) {
          totalPoints += registry[walletAddress].points;
          processedWallets.add(walletAddress);
          console.log(`Added ${registry[walletAddress].points} points from registry for wallet ${walletAddress}`);
        }
      });
    } catch (error) {
      console.error('Error reading registry:', error);
    }
    
    console.log('Total distributed tokens calculated:', totalPoints, 'from', processedWallets.size, 'wallets');
    return totalPoints;
  };
  
  useEffect(() => {
    setTotalDistributed(calculateTotalDistributed());
  }, []);

  // Listen for storage changes to update the counter
  useEffect(() => {
    const handleStorageChange = () => {
      const newTotal = calculateTotalDistributed();
      console.log('Storage change - updating total distributed tokens:', newTotal);
      setTotalDistributed(newTotal);
    };

    // Listen for custom events from reward claims
    const handlePointsUpdate = () => {
      setTimeout(() => {
        const newTotal = calculateTotalDistributed();
        console.log('Points updated event - new total:', newTotal);
        setTotalDistributed(newTotal);
      }, 100);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    
    // Check for updates every few seconds as a fallback
    const interval = setInterval(() => {
      const newTotal = calculateTotalDistributed();
      if (newTotal !== totalDistributed) {
        console.log('Interval check - updating total:', newTotal);
        setTotalDistributed(newTotal);
      }
    }, 3000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
      clearInterval(interval);
    };
  }, [totalDistributed]);

  const remainingTokens = TOTAL_SUPPLY - totalDistributed;
  const distributedPercentage = (totalDistributed / TOTAL_SUPPLY) * 100;

  return (
    <div className="glass-card p-6 rounded-lg mb-8 border-2 border-yellow-500/30">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Coins className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-yellow-500">{t('tokenTitle')}</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-lg font-semibold text-yellow-400 mb-1">
              {t('totalSupply')}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              {t('tokenConversion')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-400 font-medium">Distributed</p>
                <p className="text-lg font-bold text-green-500">
                  {totalDistributed.toLocaleString()} $GPT
                </p>
                <p className="text-xs text-muted-foreground">
                  {distributedPercentage.toFixed(2)}%
                </p>
              </div>
              
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">{t('remainingTokens')}</p>
                <p className="text-lg font-bold text-blue-500">
                  {remainingTokens.toLocaleString()} $GPT
                </p>
                <p className="text-xs text-muted-foreground">
                  {(100 - distributedPercentage).toFixed(2)}%
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(distributedPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Token Distribution Progress
              </p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t('earnDaily')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenPool;
