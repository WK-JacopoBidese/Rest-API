import { NextFunction, Request, Response } from "express";
import { findOne } from "../models/user.model";

class UserValidationMiddleware {
    async userExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const userExists = await findOne(req.params.id);

        if (!userExists) {
            return res.status(404).json({ error: `Utente con ID ${req.params.id} non trovato.` });
        }

        next();
    }
}

export default new UserValidationMiddleware();