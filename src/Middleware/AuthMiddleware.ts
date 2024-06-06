import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {myDataSource} from "../Database/Connection";
import {User, UserRole} from "../Modules/User/Entity";

export interface AuthRequest extends Request {
  user: User
}
export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(500).json({msg: "Authentication failed!"});
    }
    const decoded = jwt.verify(
      token,
      "Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO"
    ) as { userId: string; userRule: UserRole };
    const user = await myDataSource.getRepository(User).findOneBy({
      id: Number(decoded.userId),
    });
    if (!user) {
      res.status(404).json({msg: "User not found!"});
    }
    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
export const authorizeUser = async (req: AuthRequest, res: Response, next: NextFunction)=> {
    if (req.user.role === UserRole.ADMIN) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized access!" });
    }
};
