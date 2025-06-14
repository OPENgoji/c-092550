
import { ExternalLink, ShoppingCart, Clock } from 'lucide-react';

const TokenButtons = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg text-lg font-medium transition-colors justify-center"
        >
          <ShoppingCart className="w-5 h-5" />
          Купить GoldenPUF $GPUF токен
        </a>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-medium transition-colors cursor-not-allowed opacity-75 justify-center"
          disabled
        >
          <Clock className="w-5 h-5" />
          GoldenPUF $GPUF токен стейкинг скоро будет 💸
        </button>
      </div>
    </div>
  );
};

export default TokenButtons;
