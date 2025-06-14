
import { MessageCircle, ExternalLink, Users } from 'lucide-react';

const TelegramInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-400">Telegram Канал</h3>
          <p className="text-sm text-muted-foreground">Присоединяйтесь к нашему сообществу</p>
        </div>
      </div>
      
      <a
        href="https://t.me/GoldenPUFswap"
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-xl hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 border-2 border-blue-500/30 hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-blue-300 text-lg">GoldenPUF Swap</p>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-blue-400">@GoldenPUFswap</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Нажмите для перехода в Telegram</p>
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-blue-400" />
        </div>
      </a>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Получайте новости, обновления и общайтесь с сообществом
        </p>
      </div>
    </div>
  );
};

export default TelegramInfo;
