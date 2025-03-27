const jwt = require("jsonwebtoken");
const User = require('../models/user');

exports.authorizerMiddleware = async (req, res, next) => {
    const token = req.headers.gametoken;

    if (!token) {
        return res.status(401).json({ error: 'Token Not Found' });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findById(decoded.id);
        req.authorizedUser = userData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: "Invalid token" });
    }
}
