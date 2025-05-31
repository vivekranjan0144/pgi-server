import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get token from header
    if (!token) return res.status(403).send('Access denied');

    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) return res.status(403).send('Invalid token');  // Invalid token error handling
        req.user = user;
        next();
    });
};
