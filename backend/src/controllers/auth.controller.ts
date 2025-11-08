import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import customError from "../utils/customError";
import User from "../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import config from "../config/config";


// ✅ REGISTER USER
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
            const { email, password } = req.body;
            // check input
            if (!email || !password) {
                        throw new customError("Email and password are required", 400);
            }

            // check if user exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                        throw new customError("User already exists with this email", 400);
            }

            // create user
            const user = await User.create({
                        email,
                        password
            });

            const accessToken = generateAccessToken(user._id.toString());
            const refreshToken = generateRefreshToken(user._id.toString());

            // Save refresh token in DB
            user.refreshToken = refreshToken;
            await user.save();

            // Send refresh token in http-only cookie
            res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: config.NODE_ENV !=="production",
                        sameSite: "none",
                        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            // send token
            res.status(201).json({
                        message: "User registered successfully",
                        token: accessToken,
                        user: {
                                    id: user._id,
                                    email: user.email,
                        },
            });
});

// ✅ LOGIN USER
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
            const { email, password } = req.body;

            if (!email || !password) {
                        throw new customError("Email and password are required", 400);
            }

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                        throw new customError("Invalid email or password", 400);
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                        throw new customError("Invalid email or password", 400);
            }

            res.json({
                        message: "Login successful",
                        token: generateAccessToken(user._id.toString()),
                        user: {
                                    id: user._id,
                                    email: user.email,
                        },
            });
});
