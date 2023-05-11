export const authMiddleware = async (req, res, next) => {
    console.log("I am a middleware")
    // const errorObj = new Error("I am an error")
    next()
}