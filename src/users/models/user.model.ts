import { SavedUser, User, Users } from "./user.interface";
import { v4 as random } from "uuid";
import fs from "fs";
import { hashPassword } from "../../utils/password";
import dotenv from "dotenv";

dotenv.config();

const tempDir = process.env.TEMPDIR || "temp";
let users: Users = loadUsers();

function loadUsers(): Users {
    try {
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }

        const data = fs.readFileSync(`${tempDir}/users.json`, "utf-8");

        return JSON.parse(data);
    } catch (error) {
        console.log(`Errore: ${error}`);
        return {};
    }
}

function saveUsers() {
    try {
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }

        fs.writeFileSync(`${tempDir}/users.json`, JSON.stringify(users), "utf-8");
        console.log("Utente salvato con successo!");
    } catch (error) {
        console.error("Errore durante il salvataggio dell'utente.");
    }
}

export async function findAll(): Promise<SavedUser[]> {
    return Object.values(users);
}

export async function findOne(id: string): Promise<SavedUser> {
    return users[id];
}

export async function create(userData: User): Promise<SavedUser> {
    let id = random();
    let checkUser = await findOne(id);

    while (checkUser) {
        id = random();
        checkUser = await findOne(id);
    }

    const hashedPassword = await hashPassword(userData.password);
    const newUser: SavedUser = {
        id: id,
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    };

    users[id] = newUser;

    saveUsers();

    return newUser;
}

export async function update(id: string, userData: User): Promise<SavedUser | null> {
    const userExists = await findOne(id);

    if (userData.password) {
        userData.password = await hashPassword(userData.password);
    }

    users[id] = {
        ...userExists,
        ...userData
    };

    saveUsers();

    return users[id];
}

export async function remove(id: string): Promise<void | null> {
    delete users[id];

    saveUsers();
}