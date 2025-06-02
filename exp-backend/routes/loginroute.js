import express from 'express';
import { login } from '../controller/login_controller/login_controller.js';

const router = express.Router();

router.post('/login', login);

export default router;