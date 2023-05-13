import { loginForm, registerForm, userRegister, home, loginSuccess, protectedRouter, logout } from '../controllers/auth.controller.js'
import express from 'express'
const router = express.Router()
import passport from 'passport'
import { authMiddleware } from '../middleware/auth.middleware.js'

import { jwtRegisterFn, jwtLoginFn, jwtProtected } from '../controllers/jwtAuth.controller.js'
import { verifyJWT } from '../utils/utils.js'

router.get('/', home)
router.get('/loginview', loginForm)
router.get('/registerview', registerForm)
router.get('/login-success', loginSuccess)
router.get('/protected-route',authMiddleware,  protectedRouter)

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success'}))
router.post('/register', userRegister)

router.get('/logout', logout)


router.post('/jwtRegister', jwtRegisterFn)
router.post('/jwtLogin', jwtLoginFn)
router.get('/protected', verifyJWT, jwtProtected)

export default router