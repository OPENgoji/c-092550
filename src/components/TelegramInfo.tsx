
import { MessageCircle, ExternalLink } from 'lucide-react';

const TelegramInfo = () => {
  return (
    <div className="glass-card p-6 rounded-2xl border-2 border-blue-500/30">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-blue-400">Join Our Community</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Stay updated with the latest news, updates, and participate in community discussions
        </p>
        
        <button
          onClick={() => window.open('https://t.me/goldenpuf_official', '_blank')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Join Telegram
          <ExternalLink className="w-4 h-4" />
        </button>
        
        <div className="mt-4 text-xs text-muted-foreground">
          Get notified about the upcoming NFT collection launch and burn event
        </div>
      </div>
    </div>
  );
};

export default TelegramInfo;
