import { CreateTokenRequest, RefreshToken } from "./../types";
import { q } from "../../../db/db.query";

export async function createRefrehToken(
  data: CreateTokenRequest
): Promise<RefreshToken> {
  const { userId, token, expiresAt } = data;
  const result = q.one<RefreshToken>(
    `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *`,
    [userId, token, expiresAt]
  );

  return result;
}
