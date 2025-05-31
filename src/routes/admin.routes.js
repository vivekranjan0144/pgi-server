// routes/admin.routes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
  updateUserPassword
} from '../controllers/user.controller.js';

const router = express.Router();

// All routes are protected and admin-only
router.post('/users', verifyToken, authorizeRole(['admin']), createUser);
router.get('/users', verifyToken, authorizeRole(['admin']), listUsers);
router.put('/users/:user_id', verifyToken, authorizeRole(['admin']), updateUser);
router.delete('/users/:user_id', verifyToken, authorizeRole(['admin']), deleteUser);
router.put('/users/:user_id/password', verifyToken, authorizeRole(['admin']), updateUserPassword);

export default router;