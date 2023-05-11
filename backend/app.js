import express from 'express'
const app = express()
import router from './routers/routes.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from './config/index.js'

const sessionStore = new MongoStore({
    mongoUrl: config.MONGODB,
    collection: 'sessions'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000
    }
}))

app.use(router)

export default app