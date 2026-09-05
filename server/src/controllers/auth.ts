import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

// Register a new user account (POST /auth/register)
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'name, email and password are required' },
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'password must be at least 8 characters' },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      success: true,
      data: { userId: user._id, name: user.name, email: user.email },
      error: null,
    });
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      res.status(409).json({
        success: false,
        data: null,
        error: { message: 'Email is already registered' },
      });
      return;
    }
    throw err;
  }
};

// Authenticate user by email/password (POST /auth/login)
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'Email and password are required' },
    });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'Invalid credentials' },
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'Invalid credentials' },
    });
    return;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.status(200).json({
    success: true,
    data: {
      token,
      user: { userId: user._id, email: user.email, name: user.name },
    },
    error: null,
  });
};
