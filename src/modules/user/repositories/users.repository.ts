import { User } from "../../../shared";
import { q } from "../../../db/db.query";
import { CreateUserRequest } from "../type";

export async function createUser(data: CreateUserRequest): Promise<User> {
  const { firstName, lastName, email, password } = data;
  const result = q.one<User>(
    `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, email, password]
  );

  return result;
}

export async function getUserByEmail(email: string) {
  return q.maybeOne<User>(`SELECT * FROM users WHERE email = $1`, [email]);
}

export async function getUserById(id: string) {
  return q.maybeOne<User>(`SELECT * FROM users WHERE id = $1`, [id]);
}
