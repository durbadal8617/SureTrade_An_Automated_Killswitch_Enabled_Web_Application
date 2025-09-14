const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    // Remove next(); here
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    if(!emailOrUsername || !password ){
      return res.status(400).json({
        message: 'All fields are required',
        success: false
      });
    }
    
    // Find user by either email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });
    
    if(!user){
      return res.status(401).json({
        message: 'Incorrect password or email/username',
        success: false
      });
    }
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({
        message: 'Incorrect password or email/username',
        success: false
      });
    }
    
    const token = createSecretToken(user._id);
    
    // Set cookie for traditional cookie-based auth
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    });
    
    // Return BOTH formats needed by frontend
    res.status(200).json({ 
      message: "User logged in successfully", 
      success: true,
      token: token, // Add token directly in response for localStorage
      userId: user._id.toString(), // Ensure consistent string format
      username: user.username,
      emailOrUsername: user.username || user.email, // Add this for compatibility
      // Keep the user object for backward compatibility
      user: {
        id: user._id,
        userId: user._id.toString(), // Add userId here too
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Internal server error", 
      success: false 
    });
  }
};