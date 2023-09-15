import { SavedProduct, Product, Products } from "./product.interface";
import { v4 as random } from "uuid";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const tempDir = process.env.TEMPDIR || "temp";
let products: Products = loadProducts();

function loadProducts(): Products {
    try {
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }

        const data = fs.readFileSync(`${tempDir}/products.json`, "utf-8");

        return JSON.parse(data);
    } catch (error) {
        console.log(`Errore: ${error}`);
        return {};
    }
}

function saveProducts() {
    try {
        if (!fs.existsSync(tempDir)){
            fs.mkdirSync(tempDir);
        }
        
        fs.writeFileSync(`${tempDir}/products.json`, JSON.stringify(products), "utf-8");
        console.log("Articolo salvato con successo!");
    } catch (error) {
        console.error("Errore durante il salvataggio dell'articolo.");
    }
}

export async function findAll(): Promise<SavedProduct[]> {
    return Object.values(products);
}

export async function findOne(id: string): Promise<SavedProduct> {
    return products[id];
}

export async function findOneCode(code: string): Promise<SavedProduct | undefined> {
    return Object.values(products).find(product => product.code === code);
}

export async function create(productData: Product): Promise<SavedProduct> {
    let id = random();
    let checkProduct = await findOne(id);

    while (checkProduct) {
        id = random();
        checkProduct = await findOne(id);
    }

    const newProduct: SavedProduct = {
        id: id,
        ...productData
    };

    products[id] = newProduct;

    saveProducts();

    return newProduct;
}

export async function update(id: string, productData: Product): Promise<SavedProduct | null> {
    const productExists = await findOne(id);

    products[id] = {
        ...productExists,
        ...productData
    };

    saveProducts();

    return products[id];
}

export async function remove(id: string): Promise<void | null> {
    delete products[id];

    saveProducts();
}