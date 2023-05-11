import app from './app.js'
import config from './config/index.js'
import mongoose from 'mongoose'

(async () => {
    try {
        await mongoose.connect(config.MONGODB)
        console.log("DB is connected")

        app.on("error", (error) => {
            console.log("DB is not connected", error)
            throw new Error("DB is not connected", 400)
        })

        const onListening = () => {
            console.log(`App is running on ${config.PORT}`)
        }

        app.listen(config.PORT, onListening)
    } catch (error) {
        throw new Error("App is not running", error)
    }
})()