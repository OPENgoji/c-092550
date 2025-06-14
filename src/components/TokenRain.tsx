
import { useEffect, useState } from 'react';

const TokenRain = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const tokenArray = Array.from({ length: 50000 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3
      }));
      setTokens(tokenArray);

      const timer = setTimeout(() => {
        onComplete();
        setTokens([]);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black bg-opacity-40">
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
            className="w-16 h-16 token-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
