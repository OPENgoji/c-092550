
export interface WorldIDVerificationResult {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  verification_level: string;
}

export interface WorldIDConfig {
  app_id: string;
  action: string;
  signal?: string;
}

export interface WorldIDUser {
  verified: boolean;
  nullifier_hash?: string;
  verification_level?: string;
  created_at?: string;
}

// Дополнительные типы для World Chain интеграции
export interface WorldChainConfig {
  network: 'mainnet' | 'testnet';
  rpcUrl: string;
  chainId: number;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  contract_address: string;
  total_supply?: string;
  price_usd?: number;
}

// Константы для World Chain
export const WORLD_CHAIN_CONFIG: WorldChainConfig = {
  network: 'mainnet',
  rpcUrl: 'https://worldchain-mainnet.g.alchemy.com/public',
  chainId: 480
};

export const GOLDENPUF_TOKEN: TokenInfo = {
  symbol: 'GOLDENPUF-NFT',
  name: 'GoldenPUF NFT Token',
  decimals: 18,
  contract_address: '0xB7b9Bc8e8c301E761AF20143A3477e5D1890e1Dd'
};
