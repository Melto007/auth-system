import { genPassword } from '../lib/passwordUtils.js'
import User from '../models/auth.model.js'

export const home = async (_req, res) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
}

export const protectedRouter = async(req, res) => {
    res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>')
}

export const loginSuccess = async(_req, res) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
}

/**************************************************
*  @Login
*  @Method GET
*  @Route http://localhost:4000/login 
*  @Description User for login
*  @Params -
*  @return login form
***************************************************/
export const loginForm = async (_req, res) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form)
}

/**************************************************
*  @Register
*  @Method GET
*  @Route http://localhost:4000/register 
*  @Description User for register
*  @Params -
*  @return Register form
***************************************************/
export const registerForm = async (_req, res) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form)
}

/**************************************************
*  @Register
*  @Method POST
*  @Route http://localhost:4000/register 
*  @Description User Register
*  @Params - username, password
*  @return user
***************************************************/
export const userRegister = async(req, res) => {
    const { username, password } = req.body
    const saltHash = genPassword(password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const user = await User.create({
        username,
        hash,
        salt
    })

    user.save()

    res.redirect('/loginview')
}

export const logout = async(req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/protected-route')
    })
}