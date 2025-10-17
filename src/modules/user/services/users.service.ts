import { User } from "../../../shared";
import { getUserById } from "../repositories";

export async function findUserById(id: string): Promise<User> {
  /**
   * TODO:
   * 1. Check if the user exists in the cache
   * 2. If User exists, return the cached data
   * 3. otherwise, fetch the data from the db, cache, then return
   */
  const user = await getUserById(id);

  if (!user) throw new Error("User not found");

  return user;
}
