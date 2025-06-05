import { db } from "../../model/db.js";

export const createUser = (req, res) => {
    const {user_name, user_age, user_dissease, user_email, user_password} = req.body;
    const query = "INSERT INTO users (user_name, user_age, user_disease, user_email, user_password) VALUES (?, ?, ?, ?, ?)";

    const emailCheckQuery = "SELECT * FROM users WHERE user_email = ?";
    db.query(emailCheckQuery, [user_email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        db.query(query, [user_name, user_age, user_dissease, user_email, user_password], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "User created successfully", userId: result.insertId });
        }); 
    });
}   

export const getUserInfo = (req, res) => {
    const query = "SELECT user_name FROM users WHERE user_id = ?";
    
    db.query(query, [req.userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({
            user_name: result[0].user_name
        });
    });
};