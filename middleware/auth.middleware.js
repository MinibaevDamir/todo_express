const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.token

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const decoded = jwt.verify(token, 'secret')
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}