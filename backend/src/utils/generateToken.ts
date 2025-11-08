import jwt from "jsonwebtoken";
import config from "../config/config";

export const generateAccessToken = (userId: string) => {
            return jwt.sign(
                        { id: userId },
                        config.JWT_SECRET as string,
                        { expiresIn: "15m" }
            );
};



export const generateRefreshToken = (userId: string) => {
            return jwt.sign(
                        { id: userId },
                        config.JWT_REFRESH_SECRET as string,
                        { expiresIn: "7d" }
            );
};
