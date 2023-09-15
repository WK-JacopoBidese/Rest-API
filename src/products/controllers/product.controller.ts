import { Request, Response } from "express";
import * as ProductModel from "../models/product.model";
import { SavedProduct } from "../models/product.interface";

export async function create(req: Request, res: Response) {
    try {
        const newProduct = await ProductModel.create(req.body);

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la creazione del articolo." });
    }
}

export async function findAll(req: Request, res: Response) {
    try {
        const allProducts: SavedProduct[] = await ProductModel.findAll();

        return res.status(200).json({totalProducts: allProducts.length, products: allProducts});
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero degli articoli." });
    }
}

export async function findOne(req: Request, res: Response) {
    try {
        const product: SavedProduct = await ProductModel.findOne(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Articolo non trovato." });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero del singolo articolo." });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const updProduct = await ProductModel.update(req.params.id, req.body);

        return res.status(201).json(updProduct);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiornamento del articolo." });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        await ProductModel.remove(req.params.id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la cancellazione del utente." });
    }
}