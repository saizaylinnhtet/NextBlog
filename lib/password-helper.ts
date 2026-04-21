import bcrypt from "bcryptjs"

const saltRounds = 10;

export default async function generateHashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash 
}