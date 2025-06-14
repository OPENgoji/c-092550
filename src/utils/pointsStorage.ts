
// Утилиты для надежного сохранения поинтов пользователей
export interface UserPointsData {
  points: number;
  walletAddress: string;
  worldIdVerified: boolean;
  nullifierHash?: string;
  lastUpdated: number;
  version: string;
  transactions: PointsTransaction[];
}

export interface PointsTransaction {
  id: string;
  amount: number;
  type: 'daily_reward' | 'bonus' | 'conversion';
  timestamp: number;
  worldIdMultiplier: boolean;
}

export class PointsStorage {
  private static VERSION = '1.0';

  // Сохранение поинтов с множественным backup
  static saveUserPoints(walletAddress: string, points: number, worldIdData?: any): void {
    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      amount: points,
      type: 'daily_reward',
      timestamp: Date.now(),
      worldIdMultiplier: worldIdData?.verified || false
    };

    try {
      // Получаем существующие данные
      const existingData = this.getUserPointsData(walletAddress);
      
      const userData: UserPointsData = {
        points: points,
        walletAddress,
        worldIdVerified: worldIdData?.verified || false,
        nullifierHash: worldIdData?.nullifier_hash,
        lastUpdated: Date.now(),
        version: this.VERSION,
        transactions: [...(existingData?.transactions || []), transaction]
      };

      // Основное сохранение
      localStorage.setItem(`points_${walletAddress}`, points.toString());
      localStorage.setItem(`user_data_${walletAddress}`, JSON.stringify(userData));
      
      // Backup сохранения
      localStorage.setItem(`points_backup_${walletAddress}_${Date.now()}`, JSON.stringify(userData));
      localStorage.setItem('last_points_backup', JSON.stringify(userData));
      
      // Глобальный реестр пользователей
      this.updateUsersRegistry(walletAddress, userData);
      
      console.log('Points saved successfully:', userData);
    } catch (error) {
      console.error('Failed to save points:', error);
      // Fallback сохранение
      try {
        localStorage.setItem(`emergency_backup_${walletAddress}`, JSON.stringify({
          points,
          timestamp: Date.now()
        }));
      } catch (fallbackError) {
        console.error('Even emergency backup failed:', fallbackError);
      }
    }
  }

  // Получение данных пользователя с восстановлением из backup
  static getUserPointsData(walletAddress: string): UserPointsData | null {
    try {
      // Пытаемся получить основные данные
      const userData = localStorage.getItem(`user_data_${walletAddress}`);
      if (userData) {
        return JSON.parse(userData);
      }

      // Если основных данных нет, ищем в backup
      const backupKeys = Object.keys(localStorage).filter(key => 
        key.startsWith(`points_backup_${walletAddress}_`)
      );
      
      if (backupKeys.length > 0) {
        // Берем самый свежий backup
        const latestBackup = backupKeys.sort().pop();
        if (latestBackup) {
          const backupData = localStorage.getItem(latestBackup);
          if (backupData) {
            return JSON.parse(backupData);
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to get user points data:', error);
      return null;
    }
  }

  // Обновление глобального реестра пользователей
  private static updateUsersRegistry(walletAddress: string, userData: UserPointsData): void {
    try {
      const registryKey = 'golden_puf_users_registry';
      const registry = JSON.parse(localStorage.getItem(registryKey) || '{}');
      
      registry[walletAddress] = {
        points: userData.points,
        worldIdVerified: userData.worldIdVerified,
        lastUpdated: userData.lastUpdated,
        transactionCount: userData.transactions.length
      };
      
      localStorage.setItem(registryKey, JSON.stringify(registry));
    } catch (error) {
      console.error('Failed to update users registry:', error);
    }
  }

  // Получение всех пользователей для администрирования
  static getAllUsers(): Record<string, any> {
    try {
      return JSON.parse(localStorage.getItem('golden_puf_users_registry') || '{}');
    } catch (error) {
      console.error('Failed to get users registry:', error);
      return {};
    }
  }

  // Экспорт данных для конвертации в NFT
  static exportUserDataForNFT(walletAddress: string): any {
    const userData = this.getUserPointsData(walletAddress);
    if (!userData) return null;

    return {
      wallet: walletAddress,
      totalPoints: userData.points,
      worldIdVerified: userData.worldIdVerified,
      nullifierHash: userData.nullifierHash,
      transactionHistory: userData.transactions,
      eligibleForNFT: userData.points > 0,
      nftTier: this.calculateNFTTier(userData.points),
      exportTimestamp: Date.now()
    };
  }

  private static calculateNFTTier(points: number): string {
    if (points >= 100) return 'legendary';
    if (points >= 50) return 'epic';
    if (points >= 20) return 'rare';
    if (points >= 5) return 'common';
    return 'basic';
  }
}
