import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
            statusCode?: number;
}

type GlobalError = (
            err: CustomError,
            req: Request,
            res: Response,
            next: NextFunction
) => void;

export const globalError: GlobalError = (err, req, res, next) => {
            const message = err.message || "Internal server error";
            const statusCode = err.statusCode || 500;

            res.status(statusCode).json({ message });
};
