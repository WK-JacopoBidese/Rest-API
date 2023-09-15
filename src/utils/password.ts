import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export async function hashPassword(passwordToHash: string) {
    const round = parseInt(process.env.SALT!);
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(passwordToHash, salt);
    return hashedPassword;
}