const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).json({ message: "Invalid token format. Expected 'Bearer <token>'." });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            const message = err.name === 'TokenExpiredError' ? "Token expired." : "Invalid token.";
            return res.status(403).json({ message });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };