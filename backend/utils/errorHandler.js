const errorHandler = async (err, _req, res, next) => {
    if(err) {
        res.send('<h1>There was an error in a page please try again later</h1>')
    }
}
export default errorHandler