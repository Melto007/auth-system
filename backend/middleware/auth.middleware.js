export const authMiddleware = async (req, res, next) => {
    const auth = req.isAuthenticated() 

    if(auth) {
        next()
    } else {
        res.status(401).json({
            message: "Unauthorized User"
        })
    }
}