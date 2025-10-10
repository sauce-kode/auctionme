import bcrypt from "bcryptjs";

export async function generateHash(str: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(str, salt);
}

export async function compareHash(str: string, hashedStr: string) {
  return await bcrypt.compare(str, hashedStr);
}

export function randomCode(n = 6) {
  const min = Math.pow(10, n - 1);
  const max = Math.pow(10, n) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
