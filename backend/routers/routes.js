import { basicRoute  } from '../controllers/auth.controller.js'
import express from 'express'
const router = express.Router()
import { authMiddleware  } from '../middleware/auth.middleware.js'
import errorHandler from '../utils/errorHandler.js'

router.get('/', authMiddleware, errorHandler, basicRoute)

export default router