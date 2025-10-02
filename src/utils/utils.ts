import bcrypt from "bcryptjs";

export async function generateHash(str: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(str, salt);
}

export async function compareHash(str: string, hashedStr: string) {
  return await bcrypt.compare(str, hashedStr);
}
