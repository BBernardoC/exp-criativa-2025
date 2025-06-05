import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/jwt_config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
};