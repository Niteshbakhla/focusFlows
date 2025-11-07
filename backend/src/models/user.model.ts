import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// ✅ 1. TypeScript interface for User Document
export interface IUser extends Document {
            email: string;
            password: string;
            comparePassword(candidatePassword: string): Promise<boolean>,
            _id: mongoose.Types.ObjectId
}

// ✅ 2. Mongoose Schema
const userSchema: Schema<IUser> = new mongoose.Schema(
            {
                        email: {
                                    type: String,
                                    required: [true, "Email is required"],
                                    unique: true,
                                    lowercase: true,
                                    trim: true,
                                    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
                        },

                        password: {
                                    type: String,
                                    required: [true, "Password is required"],
                                    minlength: 6,
                                    select: false, // ✅ prevents password from being returned in queries
                        },
            },
            { timestamps: true }
);

// ✅ 3. Pre-save hook to hash password
userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next();

            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);

            next();
});

// ✅ 4. Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword: string) {
            return bcrypt.compare(candidatePassword, this.password);
};

// ✅ 5. Create Model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
