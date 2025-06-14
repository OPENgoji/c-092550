
import { MessageCircle, ExternalLink } from 'lucide-react';

const TelegramInfo = () => {
  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <MessageCircle className="w-8 h-8 text-blue-400" />
        <div>
          <h3 className="text-lg font-semibold">Join Our Community</h3>
          <p className="text-sm text-muted-foreground">Stay updated with latest news</p>
        </div>
      </div>
      
      <a
        href="https://t.me/GoldenPUFswap"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 bg-blue-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200 border border-blue-500 border-opacity-20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium">GoldenPUF Swap</p>
            <p className="text-sm text-muted-foreground">@GoldenPUFswap</p>
          </div>
        </div>
        <ExternalLink className="w-5 h-5 text-blue-400" />
      </a>
    </div>
  );
};

export default TelegramInfo;
