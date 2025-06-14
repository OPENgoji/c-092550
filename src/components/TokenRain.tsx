
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
    <div className="fixed inset-0 pointer-events-none z-50">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute animate-bounce"
          style={{
            left: `${token.x}%`,
            animationDelay: `${token.delay}s`,
            animationDuration: '1s'
          }}
        >
          <img
            src="/lovable-uploads/ad787e15-5730-4794-bb13-51b5e117eff5.png"
            alt="GoldenPUF Token"
            className="w-16 h-16 animate-pulse token-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
