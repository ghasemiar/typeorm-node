import jwt from "jsonwebtoken";
import { User } from "../Modules/User/Entity";

export const generateToken = (user: User): string => {
  console.log(user.id);
  return jwt.sign(
    { userId: user.id, userRole: user.role },
    "Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO",
    {
      expiresIn: "4h",
    }
  );
};
