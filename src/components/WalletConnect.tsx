
import { useState } from 'react';
import { Wallet } from 'lucide-react';

const WalletConnect = ({ onConnect }: { onConnect: (address: string) => void }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    // Симуляция подключения кошелька World Chain
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
      onConnect(mockAddress);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 disabled:opacity-70"
    >
      <Wallet className="w-6 h-6" />
      {isConnecting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          Подключение...
        </>
      ) : (
        'Connect World Chain Wallet'
      )}
    </button>
  );
};

export default WalletConnect;
