export interface TokenPayload {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type RefreshToken = {
  id: string;
  user_id: string;
  token: string;
  created_at: string;
  expires_at: string;
};

export type CreateTokenRequest = {
  userId: string;
  token: string;
  expiresAt: Date;
};
