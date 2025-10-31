import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generateToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export const registerUser=async(req,res) =>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please fill the fields"})
    }

    try {
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }

        const user=await User.create({name,email,password});

        const verificationToken=generateToken(user._id);

         const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
    await sendEmail(
      user.email,
      "Finance Tracker - Verify Your Email",
      `Hi ${user.name},\n\nPlease verify your email by clicking the link: ${verificationLink}`
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

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



export const LoginUser= async(req,res)=>{
  const{email,password}=req.body;

  if(!email || !password){
      return res.status(400).json({message:"Please fill the fields"})
  }

  try {
      const user=await User.findOne({email});
      if(!user){
          return res.status(400).json({message:"User not found"})
      }

      const isMatch=await user.matchPassword(password);
      if(!isMatch){
          return res.status(400).json({message:"Invalid credentials"})
      }

      const token=generateToken(user._id);
      res.status(200).json({token});
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
}