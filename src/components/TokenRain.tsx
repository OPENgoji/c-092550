
import { useEffect, useState } from 'react';

const TOKEN_IMAGE = "/lovable-uploads/55fa699e-e967-46e2-9719-3fe4e122ecd8.png";

const TokenRain = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const tokenArray = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3
      }));
      setTokens(tokenArray);

      const timer = setTimeout(() => {
        onComplete();
        setTokens([]);
      }, 8000);

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
          className="absolute animate-token-fall"
          style={{
            left: `${token.x}%`,
            animationDelay: `${token.delay}s`,
            top: '-200px'
          }}
        >
          <img
            src={TOKEN_IMAGE}
            alt="Rain Token"
            className="w-16 h-16 token-image"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
