
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
          GoldenPUF Price Chart
        </h2>
      </div>
      <div className="h-[400px] w-full">
        <TradingViewWidget
          symbol="0xEde38e5b74d2fD1b2213eD880819FF95758f02f7"
          theme="dark"
          locale="en"
          autosize
          hide_side_toolbar={false}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg="#141413"
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={false}
          container_id="goldenpuf_chart"
        />
      </div>
    </div>
  );
};

export default GoldenPUFChart;
