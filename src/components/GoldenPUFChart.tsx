
import TradingViewWidget from 'react-tradingview-widget';

const GoldenPUFChart = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <img
            src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
            alt="GoldenPUF"
            className="w-16 h-16 token-image"
          />
          GoldenPUF $GPUF Live Chart
        </h2>
      </div>
      <div className="h-[500px] w-full">
        <TradingViewWidget
          symbol="WORLDCHAIN:0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd"
          theme="Dark"
          locale="en"
          autosize
          hide_side_toolbar={false}
          allow_symbol_change={false}
          interval="15"
          toolbar_bg="#141413"
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={false}
          container_id="goldenpuf_live_chart"
          withdateranges={true}
          range="1d"
          style="1"
          details={true}
          hotlist={true}
          calendar={false}
          studies={[
            "Volume@tv-basicstudies",
            "MACD@tv-basicstudies"
          ]}
        />
      </div>
      <div className="mt-4 p-3 bg-yellow-900 bg-opacity-20 rounded-lg">
        <p className="text-sm text-yellow-400 text-center">
          📈 Реальная цена токена GoldenPUF $GPUF - Contract: 0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd
        </p>
      </div>
    </div>
  );
};

export default GoldenPUFChart;
