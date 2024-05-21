import jwt from "jsonwebtoken";
import {User} from "../Entities/User";

export const generateToken = (user:User): string => {
    console.log(user.id)
    return jwt.sign(
        { userId: user.id },
        "Rz2aM90g6E0Tsihuod21XyGBeD3345EwMCUyg2H4KbPeWovDhzRHTpCs8KoWrkZO",
        {
            expiresIn: "4h",
        }
    );
};
