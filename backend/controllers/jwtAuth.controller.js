import User from '../models/auth.model.js'
import { issueJWT, genPassword, validPassword, verifyJWT } from '../utils/utils.js'

/**************************************************
*  @Register
*  @Method GET
*  @Route http://localhost:4000/jwtRegister 
*  @Description User for Register
*  @Params - username, password
*  @return login form
***************************************************/
export const jwtRegisterFn = async (req, res) => {
    const { username, password } = req.body
    const saltHash = genPassword(password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const user = await User.create({
        username: username,
        hash,
        salt
    })

    user.save()

    const jwt = issueJWT(user)
    // res.redirect('/jwtLogin')
    res.status(200).json({
        success: true,
        message: "successfully register",
        user,
        token: jwt.token,
        expiresIn: jwt.expires 
    })
}

/**************************************************
*  @LOGIN
*  @Method GET
*  @Route http://localhost:4000/jwtLogin
*  @Description User for Register
*  @Params - username, password
*  @return login form
***************************************************/
export const jwtLoginFn = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if(!user) {
        throw new Error("Invalid Credential")
    }

    const isValidPassword = validPassword(password, user.hash, user.salt)
   
    if(!isValidPassword) {
        throw new Error("Invalid Credential")
    } 

    const tokenObject = issueJWT(user)
    res.status(200).json({
        success: true,
        message: "successfully login",
        token: tokenObject.token,
        expiresIn: tokenObject.expires
    })
}

export const jwtProtected = async (_req, res) => {
    res.status(200).json({ 
        success: true,
         msg: "You are successfully authenticated to this route!"
    })
}