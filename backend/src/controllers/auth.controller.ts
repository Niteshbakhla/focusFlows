import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import customError from "../utils/customError";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";


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

            // send token
            res.status(201).json({
                        message: "User registered successfully",
                        token: generateToken(user._id.toString()),
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
                        token: generateToken(user._id.toString()),
                        user: {
                                    id: user._id,
                                    email: user.email,
                        },
            });
});
