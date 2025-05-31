import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);  // Corrected the logout route to use logout function
export default router;
