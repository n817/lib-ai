import type { Request, Response } from 'express';
import User from '../models/user.js';

export const getCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId; // Get the ID from the req.user object
  const user = await User.findOne({ _id: userId }).select('-password'); // Find the user by its ID and omit the password with .select("-password")
  // If the user isn't found, return a 404 with an appropriate message
  if (!user) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'User not found' },
    });
    return;
  }
  // Otherwise, return a 200 response with the user's info (except the password)
  res.status(200).json({
    success: true,
    data: { userId, name: user.name, email: user.email },
    error: null,
  });
};
