
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
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <Wallet className="w-5 h-5" />
      {isConnecting ? 'Connecting...' : 'Connect World Chain Wallet'}
    </button>
  );
};

export default WalletConnect;
