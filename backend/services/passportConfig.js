// import fs from 'fs'
// import path from 'path'
// import { Strategy, ExtractJwt  } from 'passport-jwt'

// import User from '../models/auth.model.js'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY,
//     algorithms: ['RS256']
// }

// const JwtStratagy = new Strategy(options, async  (payload, cb) => {
//     const user = await User.findOne({ _id: payload.sub })

//     try {
//         if(user) {
//             return cb(null, user)
//         } else {
//             return cb(null, false)
//         }
//     } catch (error) {
//         throw new Er