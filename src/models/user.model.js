import pool from '../config/db.js';

// Find a user by email
export const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Assuming there's only one user with that email
  } catch (err) {
    console.error('Error querying the database:', err);
    throw err;
  }
};
