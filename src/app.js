import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import managerRoutes from './routes/manager.routes.js';
import employeeRoutes from './routes/employee.routes.js';

dotenv.config();

const app = express();
app.use(cors());  // Enable CORS for frontend communication
app.use(express.json());
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Successfully connected to Azure MySQL');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to Azure MySQL:', err.message);
    process.exit(1);
  }
};

startServer();

// CORRECT: ES6 + async/await + mysql2/promise  {query sample}
app.get('/query', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    console.error('❌ Query error:', err.message);
    res.status(500).send('Could not retrieve jobs');
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/employee', employeeRoutes);