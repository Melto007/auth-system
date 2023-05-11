import dotenv from 'dotenv'
dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB
}

export default config