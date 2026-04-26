import bcrypt from "bcryptjs"
import crypto from "crypto"

const saltRounds = 10;

export async function generateHashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash 
}

export async function comparePassword(input: string, password: string): Promise<boolean> {
    const match = await bcrypt.compare(input, password);
    return match
}

export function generateSessionToken(): string {
    const sessionToken = crypto.randomBytes(128).toString('hex')
    return sessionToken
}