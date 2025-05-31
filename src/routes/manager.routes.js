// routes/manager.routes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { createEmployee, getEmployees } from '../controllers/employee.controller.js';

const router = express.Router();

// All routes are protected ay

router.post('/employees', verifyToken, authorizeRole(['general manager']), createEmployee);
router.get('/employees', verifyToken, authorizeRole(['general manager']), getEmployees);
export default router;