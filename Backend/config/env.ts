import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'
export const MONGO_URI = process.env.MONGO_URI as string
