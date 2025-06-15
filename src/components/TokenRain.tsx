
import { useEffect, useState } from 'react';

interface TokenRainProps {
  isActive: boolean;
  onComplete: () => void;
}

const TokenRain = ({ isActive, onComplete }: TokenRainProps) => {
  const [tokens, setTokens] = useState<Array<{ id: number; delay: number; duration: number; left: number }>>([]);

  useEffect(() => {
    if (isActive) {
      // Создаем массив падающих токенов
      const newTokens = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2000, // Задержка до 2 секунд
        duration: 8000 + Math.random() * 4000, // Длительность 8-12 секунд
        left: Math.random() * 100 // Позиция по горизонтали в %
      }));

      setTokens(newTokens);

      // Завершаем анимацию через максимальное время
      const maxDuration = Math.max(...newTokens.map(t => t.delay + t.duration));
      setTimeout(() => {
        setTokens([]);
        onComplete();
      }, maxDuration);
    }
  }, [isActive, onComplete]);

  if (!isActive || tokens.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="absolute w-12 h-12 animate-token-fall"
          style={{
            left: `${token.left}%`,
            animationDelay: `${token.delay}ms`,
            animationDuration: `${token.duration}ms`,
          }}
        >
          <img
            src="/lovable-uploads/a8e8291a-531a-42d0-b99a-151de202bf83.png"
            alt="Golden Token"
            className="w-full h-full object-contain opacity-80"
          />
        </div>
      ))}
    </div>
  );
};

export default TokenRain;
