import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import customError from "../utils/customError";
import Task from "../models/task.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// ✅ CREATE TASK
export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
            const { title, description } = req.body;
            console.log(req.body)

            if (!title || !description) {
                        throw new customError("Title and description are required", 400);
            }

            const task = await Task.create({
                        title,
                        description,
                        user: req.user?.id,
            });

            res.status(201).json({
                        message: "Task created successfully",
                        task,
            });
});

// ✅ GET ALL TASKS OF LOGGED IN USER
export const getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
            const tasks = await Task.find({ user: req.user?.id }).sort({ createdAt: -1 });

            res.json({
                        count: tasks.length,
                        tasks,
            });
});

// ✅ UPDATE TASK
export const updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
            const { id } = req.params;
            const { title, description, status } = req.body;

            // Check if task exists
            const task = await Task.findById(id);
            if (!task) {
                        throw new customError("Task not found", 404);
            }

            // Make sure user owns the task
            if (task.user.toString() !== req.user?.id) {
                        throw new customError("Unauthorized action", 403);
            }

            // Update fields
            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (status !== undefined) task.status = status;


            const updatedTask = await task.save();

            res.json({
                        message: "Task updated successfully",
                        task: updatedTask,
            });
});

// ✅ DELETE TASK
export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
            const { id } = req.params;

            const task = await Task.findById(id);
            if (!task) {
                        throw new customError("Task not found", 404);
            }

            if (task.user.toString() !== req.user?.id) {
                        throw new customError("Unauthorized action", 403);
            }

            await task.deleteOne();

            res.json({
                        message: "Task deleted successfully",
            });
});
