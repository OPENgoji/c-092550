
import { useEffect, useState } from 'react';

const TokenRain = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [tokens, setTokens] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    console.log("TokenRain effect triggered, isActive:", isActive);
    if (isActive) {
      const tokenArray = Array.from({ length: 50000 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3
      }));
      console.log("Created token array with", tokenArray.length, "tokens");
      setTokens(tokenArray);

      const timer = setTimeout(() => {
        console.log("Token rain timer completed");
        onComplete();
        setTokens([]);
      }, 10000);

      return () => {
        console.log("Cleaning up token rain timer");
        clearTimeout(timer);
      };
    } else {
      console.log("Setting tokens to empty array");
      setTokens([]);
    }
  }, [isActive, onComplete]);

  console.log("TokenRain render - isActive:", isActive, "tokens count:", tokens.length);

  if (!isActive) {
    console.log("TokenRain not active, returning null");
    return null;
  }

  if (tokens.length === 0) {
    console.log("No tokens to display, returning null");
    return null;
  }

  console.log("Rendering TokenRain with", tokens.length, "tokens");

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
