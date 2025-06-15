
import { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Импортируем типы, чтобы не было ошибки TS2339
import "@/types/tradingview.d.ts";

const TRADINGVIEW_SRC = "https://s3.tradingview.com/tv.js";

const GoldenPUFChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(); // добавляем перевод

  // Динамическая загрузка TradingView скрипта
  useEffect(() => {
    let isMounted = true;

    function loadScript(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (window.TradingView) return resolve();
        const scriptExists = Array.from(document.scripts).some((s) => s.src === TRADINGVIEW_SRC);
        if (scriptExists) {
          // Скрипт уже есть, ждём пока загрузится
          const interval = setInterval(() => {
            if (window.TradingView) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
          // Через 3 секунды отказываемся ждать
          setTimeout(() => {
            clearInterval(interval);
            if (!window.TradingView) reject(new Error("TradingView not loaded"));
          }, 3000);
          return;
        }
        // Создаём новый скрипт
        const script = document.createElement("script");
        script.src = TRADINGVIEW_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load TradingView script"));
        document.body.appendChild(script);
      });
    }

    loadScript()
      .then(() => {
        if (!isMounted || !window.TradingView) return;
        try {
          new window.TradingView.widget({
            width: "100%",
            height: 400,
            symbol: "WORLDCHAIN:0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd",
            interval: "15",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#141413",
            enable_publishing: false,
            hide_top_toolbar: false,
            save_image: false,
            container_id: "goldenpuf_live_chart",
            withdateranges: true,
            range: "1D",
            details: true,
            hotlist: true,
            calendar: false,
            studies: [
              "Volume@tv-basicstudies",
              "MACD@tv-basicstudies"
            ]
          });
        } catch (e: any) {
          setError("TradingView chart error: " + e?.message);
        }
      })
      .catch((e) => {
        setError(typeof t === "function" ? t("tradingViewNotAvailable") + " " + e.message : "TradingView not available: " + e.message);
      });

    return () => {
      isMounted = false;
    };
  }, [t]);

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-white">{t('liveChart')}</h3>
      </div>
      
      <div className="crypto-chart">
        <div id="goldenpuf_live_chart" ref={chartRef} className="w-full h-full min-h-[400px]">
          {error ? (
            <div className="flex items-center justify-center h-full py-16">
              <div className="text-center">
                <div className="rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4 animate-spin"></div>
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-muted-foreground">{t('loading') || "Loading live chart..."}</p>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default GoldenPUFChart;

