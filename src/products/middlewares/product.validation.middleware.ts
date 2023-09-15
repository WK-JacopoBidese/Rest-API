import { NextFunction, Request, Response } from "express";
import { findOne, findOneCode } from "../models/product.model";

class ProductValidationMiddleware {
    async productExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const productExists = await findOne(req.params.id);

        if (!productExists) {
            return res.status(404).json({ error: `Articolo con ID ${req.params.id} non trovato.` });
        }

        next();
    }

    async productCodeExists(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { code } = req.body;

        if (!code) {
            next();
            return;
        }

        const productCodeExists = await findOneCode(code);
        if (productCodeExists) {
            return res.status(400).json({ error: `Articolo con codice ${code} già presente.` });
        }

        next();
    }

    async productDiscontinued(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const { discontinued } = req.body;
        const productExists = await findOne(req.params.id);

        if (productExists.discontinued === true && discontinued === false) {
            return res.status(400).json({ error: `Articolo con ID ${req.params.id} già in stato disattivo.` });
        }

        next();
    }
}

export default new ProductValidationMiddleware();