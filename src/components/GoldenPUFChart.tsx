
import { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';

const GoldenPUFChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && window.TradingView) {
      new window.TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "WORLDCHAIN:0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#141413",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "save_image": false,
        "container_id": "goldenpuf_live_chart",
        "withdateranges": true,
        "range": "1D",
        "details": true,
        "hotlist": true,
        "calendar": false,
        "studies": [
          "Volume@tv-basicstudies",
          "MACD@tv-basicstudies"
        ]
      });
    }
  }, []);

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-white">Live Price Chart</h3>
      </div>
      
      <div className="crypto-chart">
        <div id="goldenpuf_live_chart" ref={chartRef} className="w-full h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading live chart...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="https://dexscreener.com/worldchain/0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-yellow-500 hover:text-yellow-400 underline"
        >
          View on DEX Screener →
        </a>
      </div>
      
      <script src="https://s3.tradingview.com/tv.js"></script>
    </div>
  );
};

export default GoldenPUFChart;
