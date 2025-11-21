import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generateToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill the fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const verificationToken = generateToken(user._id);

    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

    try {
      await sendEmail(
        user.email,
        "Finance Tracker - Verify Your Email",
        `Hi ${user.name},\n\nPlease verify your email by clicking the link: ${verificationLink}`
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // proceed without failing
    }

    // AUTO-LOGIN: set HttpOnly cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registration successful! Please check your email for verification link.",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: "Email successfully verified!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};



export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill the fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // short-lived token
    });

    // Set token as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // only over HTTPS in production
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Optionally send user info back
    res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getMe = async (req, res) => {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout= async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

