
import { useEffect, useState } from 'react';

const TokenRain = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const tokenArray = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setTokens(tokenArray);

      const timer = setTimeout(() => {
        onComplete();
        setTokens([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute animate-token-fall"
          style={{
            left: `${token.x}%`,
            animationDelay: `${token.delay}s`,
            top: '-200px'
          }}
        >
          <img
            src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
            alt="GoldenPUF Token"
            className="w-24 h-24 token-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
