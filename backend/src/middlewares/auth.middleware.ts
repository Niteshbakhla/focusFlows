import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import customError from "../utils/customError";
import config from "../config/config";

// ✅ Extend Request to include user
export interface AuthRequest extends Request {
            user?: {
                        id: string;
            };
}

// ✅ Your JWT payload type
interface JwtPayloadCustom extends jwt.JwtPayload {
            id: string;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                        throw new customError("Not authorized, no token", 401);
            }

            const token: string | any = authHeader.split(" ")[1];

            try {
                        const decoded = jwt.verify(token, config.JWT_SECRET as string) as unknown as JwtPayloadCustom;

                        req.user = { id: decoded.id };

                        next();
            } catch (error) {
                        throw new customError("Invalid or expired token", 401);
            }
};

export default authMiddleware;
