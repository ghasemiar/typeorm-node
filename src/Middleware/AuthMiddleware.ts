import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../Entities/User";
import { myDataSource } from "../Database/Connection";
export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: UserRole;
  };
}
export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decoded = jwt.verify(
      token,
      "Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO"
    ) as { userId: string; userRule: UserRole };
    console.log(decoded);
    const user = await myDataSource.getRepository(User).findOneBy({
      id: Number(decoded.userId),
    });
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const authorizeUser = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized access!" });
    }
  };
};
