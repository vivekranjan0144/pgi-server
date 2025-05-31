import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Create a new user (admin only)
export const createUser = async (req, res) => {
  const { email, password, employee_id, factory_location_id, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (email, password_hash, employee_id, factory_location_id, role) VALUES (?, ?, ?, ?, ?)`,
    [email, hash, employee_id, factory_location_id, role || 'user']
  );

  res.status(201).json({ message: 'User created successfully' });
};

// List all users (admin only)
export const listUsers = async (req, res) => {
  const [users] = await pool.query(
    `SELECT user_id, email, employee_id, factory_location_id, role, is_active FROM users`
  );
  res.json(users);
};

// Update user email or role (admin only)
export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { email, role } = req.body;

  await pool.query(
    `UPDATE users SET email = ?, role = ? WHERE user_id = ?`,
    [email, role, user_id]
  );

  res.json({ message: 'User updated successfully' });
};

// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  const { user_id } = req.params;

  await pool.query(`DELETE FROM users WHERE user_id = ?`, [user_id]);

  res.json({ message: 'User deleted successfully' });
};

// Update user password (admin only)
export const updateUserPassword = async (req, res) => {
  const { user_id } = req.params;
  const { new_password } = req.body;

  if (!new_password) {
    return res.status(400).json({ message: 'New password is required' });
  }

  const hash = await bcrypt.hash(new_password, 10);

  await pool.query(`UPDATE users SET password_hash = ? WHERE user_id = ?`, [hash, user_id]);

  res.json({ message: 'Password updated successfully' });
};
