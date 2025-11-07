import mongoose, { Document, Schema } from "mongoose";

// ✅ 1. Task interface for TypeScript
export interface ITask extends Document {
            title: string;
            description: string;
            status: "pending" | "completed";
            user: mongoose.Types.ObjectId; // reference to User
}

// ✅ 2. Mongoose Schema
const taskSchema: Schema<ITask> = new mongoose.Schema(
            {
                        title: {
                                    type: String,
                                    required: true,
                        },

                        description: {
                                    type: String,
                                    required: true,
                        },

                        status: {
                                    type: String,
                                    enum: ["pending", "completed"],
                                    default: "pending",
                        },

                        user: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "User",
                                    required: true,
                        },
            },
            { timestamps: true }
);

// ✅ 3. Mongoose model
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
