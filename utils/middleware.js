import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token found
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;

    // Continue to next middleware or controller
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token.", error: error.message });
  }
};

