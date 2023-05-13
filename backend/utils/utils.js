import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/auth.model.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToKey = path.join(__dirname, '..', 'id_rsa_private.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf-8')

const pathToKey2 = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey2, 'utf-8')

export function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

export function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

export function issueJWT(user) {
    const _id = user._id

    const expiresIn = '1d'
    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

export async function verifyJWT(req, res, next) {
    try {
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
            token = req.headers.authorization.split(" ")[1]
        }
        
        if(token.match(/\S+\.\S+\.\S*/) !== null) {
            const verify = jwt.verify(token, PUB_KEY, { algorithms: ['RS256'] })
            req.user = await User.findById(verify.sub, '_id username') 
            next()
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "You are not authorized"
        })
    }
}
