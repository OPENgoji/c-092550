
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
}
