import { IUser } from "..//User";
import jwt from "jsonwebtoken";

export const generateToken = (user: IUser): string => {
    return jwt.sign(
        { userId: user.id },
        "Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO",
        {
            expiresIn: "1h",
        }
    );
};
