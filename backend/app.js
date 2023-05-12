import express from 'express'
const app = express()
import router from './routers/routes.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import config from './config/index.js'
import strategy from './services/passport.js'
import passport from 'passport'

const sessionStore = new MongoStore({
    mongoUrl: config.MONGODB,
    collection: 'sessions'
})

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 3 * 24 * 60 * 60 * 1000
    }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

passport.use(strategy)

app.use(passport.initialize())
app.use(passport.session())

app.use(router)

export default app