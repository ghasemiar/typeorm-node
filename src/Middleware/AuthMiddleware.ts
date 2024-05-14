import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {UserEntities} from "./../Entities/UserEntities";
import {AppDataSource} from "../Database/Connection";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        rule: string;
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
        console.log(decoded);
        const user = await AppDataSource.getRepository(UserEntities).findOneBy({
            id: req.params.id,
        })
        const user = await UserEntities.findById(decoded.userId);
        if (!user) {
            throw new Error("User not found!");
        }
        req.user = { id: user.id, rule: user.rule };
        next();
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const authorizeUser = (rule: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user?.rule === rule || req.user?.rule === "admin") {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized access!" });
        }
    };
};
