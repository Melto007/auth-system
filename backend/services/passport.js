import User from '../models/auth.model.js'
import LocalStrategy from 'passport-local'
import passport from 'passport'
import { validPassword } from '../lib/passwordUtils.js'

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

const verifyCallBack = async (username, password, cb) => {
    const user = await User.findOne({ username })
    if(!user) {
        return cb(null, false)
    }

    const isValid = validPassword(password, user.hash, user.salt)

    if(isValid) {
        return cb(null, user)
    } else {
        return cb(null, false)
    }
}

const strategy = new LocalStrategy(customFields, verifyCallBack)

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (userId, cb) => {
    const user = await User.findById(userId)

    if(user) {
        cb(null, user)
    } else {
        cb(null, false)
    }
})

export default strategy