import jwt from "jsonwebtoken";
import config from "../config/config";

const generateToken = (userId: string) => {
            return jwt.sign(
                        { id: userId },
                        config.JWT_SECRET as string,
                        { expiresIn: "7d" }
            );
};

export default generateToken;
