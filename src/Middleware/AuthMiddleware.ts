import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "../Entities/User"
import {myDataSource} from "../Database/Connection";
export interface AuthRequest extends Request {
    user?: {
        id: number;
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
        ) as { userId: string };
        console.log(decoded)
        const user = await myDataSource.getRepository(User).findOneBy({
            id: Number(decoded.userId),
        })
        if (!user) {
            throw new Error("User not found!");
        }
        req.user = { id: user.id };
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

// export const authorizeUser = (rule: string) => {
//     return (req: AuthRequest, res: Response, next: NextFunction) => {
//         if (req.user?.rule === rule || req.user?.rule === "admin") {
//             next();
//         } else {
//             res.status(403).json({ message: "Unauthorized access!" });
//         }
//     };
// };
