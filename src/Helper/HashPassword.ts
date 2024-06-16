import bcrypt from "bcrypt";

export const hashedPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
