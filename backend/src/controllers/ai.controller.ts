import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import customError from "../utils/customError";
import groqClient from "../utils/groqClient";

export const improveTask = asyncHandler(async (req: Request, res: Response) => {
            const { text } = req.body;

            if (!text) {
                        throw new customError("Text is required", 400);
            }

            // ✅ Call Groq LLM
            const result = await groqClient.chat.completions.create({
                        model: "openai/gpt-oss-20b",
                        messages: [
                                    {
                                                role: "user",
                                                content: `Improve this task description and make it clearer. Keep it short:\n${text}`,
                                    },
                        ],
            });

            const improvedText = result.choices[0]?.message?.content || text;

            res.json({
                        original: text,
                        improved: improvedText,
            });
});
