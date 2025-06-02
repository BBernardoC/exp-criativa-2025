import express from 'express';
import { createUser, getUserInfo } from '../controller/user_controller/user_controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/info', verifyToken, getUserInfo);

export default router;