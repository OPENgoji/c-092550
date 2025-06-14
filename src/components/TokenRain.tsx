
import { useEffect, useState } from 'react';

const TokenRain = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const tokenArray = Array.from({ length: 5000 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5
      }));
      setTokens(tokenArray);

      const timer = setTimeout(() => {
        onComplete();
        setTokens([]);
      }, 20000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setTokens([]);
    }
  }, [isActive, onComplete]);

  if (!isActive || tokens.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black bg-opacity-40">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute animate-token-fall-slow"
          style={{
            left: `${token.x}%`,
            animationDelay: `${token.delay}s`,
            top: '-200px'
          }}
        >
          <img
            src="/lovable-uploads/2f6063b3-dfc0-4223-b344-aae167eb48a6.png"
            alt="GoldenPUF Token"
            className="w-12 h-12 token-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
