import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";

class BodyValidationMiddleware {
    verifyBodyFieldsError(req: Request, res: Response, next: NextFunction): Response | void {
        const errors: Result<unknown> = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        next();
    }
}

export default new BodyValidationMiddleware();