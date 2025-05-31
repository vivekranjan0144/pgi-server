import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByEmail } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwtConfig from '../config/jwtConfig.js';

dotenv.config();

//////////---------Login----------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    {
      id: user.user_id,
      employee_id: user.employee_id,
      factory_location_id: user.factory_location_id,
      role: user.role
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  res.json({ token , role: user.role });
};



//////////logout=---------
export const logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};

