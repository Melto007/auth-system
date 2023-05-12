import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    SESSION_SECRET: process.env.SESSION_SECRET
}

export default config