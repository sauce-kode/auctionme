import { signupInput } from "@/modules/auth/validation";
import { q } from "../../../db/db.query";
import { User } from "@/modules/user/type";

export function createUser(
  data: signupInput & { hashedPassword: string }
): Promise<User> {
  const { firstName, lastName, email, hashedPassword } = data;
  const result = q.one<User>(
    `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, email, hashedPassword]
  );

  return result;
}
