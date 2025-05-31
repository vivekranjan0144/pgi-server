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

// CORS configuration
const corsOptions = {
  origin: 'https://orange-ocean-085df1d1e.6.azurestaticapps.net', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow the necessary headers
  credentials: true, // Allows sending cookies with the request (if needed)
  
};

app.use(cors(corsOptions)); // Use the defined CORS configuration
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

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/employee', employeeRoutes);