export const basicRoute = async (req, res) => {
    if(req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1
    }else {
        req.session.viewCount = 1
    }
    res.send(`<h1>You have visited this page ${req.session.viewCount}</h1>`)
}