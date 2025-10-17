import { User } from "../../shared";

export type UserResponse = Omit<User, "password" | "created_at" | "updated_at">;

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
