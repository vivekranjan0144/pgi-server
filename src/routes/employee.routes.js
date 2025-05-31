// routes/employee.routes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { createMaterial, getMaterials } from '../controllers/materials.controller.js';

const router = express.Router();

// All routes are protected ay
router.post('/materials', verifyToken, authorizeRole(['store manager']), createMaterial);
router.get('/materials', verifyToken, authorizeRole(['store manager']), getMaterials);
export default router;