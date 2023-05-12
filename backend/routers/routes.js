import { loginForm, registerForm, userRegister, home, loginSuccess, protectedRouter, logout } from '../controllers/auth.controller.js'
import express from 'express'
const router = express.Router()
import passport from 'passport'
import { authMiddleware } from '../middleware/auth.middleware.js'

router.get('/', home)
router.get('/loginview', loginForm)
router.get('/registerview', registerForm)
router.get('/login-success', loginSuccess)
router.get('/protected-route',authMiddleware,  protectedRouter)

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success'}))
router.post('/register', userRegister)

router.get('/logout', logout)

export default router