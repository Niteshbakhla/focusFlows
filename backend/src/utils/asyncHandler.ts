import { NextFunction, Request, Response } from "express"


type AsyncHandler = (
            fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => (req: Request, res: Response, next: NextFunction) => void


export const asyncHandler: AsyncHandler = (fn) => {
            return (req, res, next) => {
                        Promise.resolve(fn(req, res, next)).catch(next);
            }
}
