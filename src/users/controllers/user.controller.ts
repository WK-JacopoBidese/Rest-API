import { Request, Response } from "express";
import * as UserModel from "../models/user.model";
import { SavedUser } from "../models/user.interface";

export async function create(req: Request, res: Response) {
    try {
        const newUser = await UserModel.create(req.body);

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la creazione dell'utente." });
    }
}

export async function findAll(req: Request, res: Response) {
    try {
        const allUsers: SavedUser[] = await UserModel.findAll();

        return res.status(200).json({totalUsers: allUsers.length, users: allUsers});
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero degli utenti." });
    }
}

export async function findOne(req: Request, res: Response) {
    try {
        const user: SavedUser = await UserModel.findOne(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "Utente non trovato." });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante il recupero del singolo utente." });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const updUser = await UserModel.update(req.params.id, req.body);

        return res.status(201).json(updUser);
    } catch (error) {
        return res.status(500).json({ error: "Errore durante l'aggiornamento dell'utente." });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        await UserModel.remove(req.params.id);

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: "Errore durante la cancellazione del utente." });
    }
}