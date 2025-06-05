import { db } from "../../model/db.js";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, JWT_EXPIRES_IN } from '../../config/jwt_config.js';

export const login = (req, res) => {
    const { user_email, user_password } = req.body;
    
    const query = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
    
    db.query(query, [user_email, user_password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        const user = result[0];
        const token = jwt.sign(
            { userId: user.user_id, email: user.user_email },
            SECRET_KEY,
            { expiresIn: JWT_EXPIRES_IN }
        );
        
        res.status(200).json({
            message: "Login successful",
            token: token
        });
    });
};

// Middleware to verify token
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