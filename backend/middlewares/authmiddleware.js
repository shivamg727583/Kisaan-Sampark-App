import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the user is a "farmer" or a "user"
    if (user.userType === 'farmer' || user.userType === 'user') {
      req.user = user; // Attach user to request object
      return next(); // Proceed to the next middleware or route handler
    } else {
      // If the user is neither "farmer" nor "user", return unauthorized
      return res.status(403).json({ message: 'Access forbidden: invalid user type' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
