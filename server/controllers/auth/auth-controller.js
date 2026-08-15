const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Independent checks for email and username to handle all conflict scenarios
    const checkEmail = await User.findOne({ email: email.toLowerCase() });
    const checkUserName = await User.findOne({ userName: userName.toLowerCase() });

    if (checkEmail || checkUserName) {
      if (checkEmail && checkUserName) {
        return res.status(400).json({
          success: false,
          message: "Both email and username are already registered. Please use different ones.",
        });
      }
      if (checkEmail) {
        return res.status(400).json({
          success: false,
          message: "This email is already registered. Please try logging in or use another email.",
        });
      }
      if (checkUserName) {
        return res.status(400).json({
          success: false,
          message: "This username is already taken. Please choose a different one.",
        });
      }
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName: userName.toLowerCase(), // Store in lowercase for consistency
      email: email.toLowerCase(),       // Store in lowercase for consistency
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.error("Error in registerUser:", e);

    // Handle duplicate key errors from MongoDB (unique indexes)
    if (e.code === 11000) {
      const duplicateField = Object.keys(e.keyPattern || {})[0] || "field";
      return res.status(400).json({
        success: false,
        message:
          duplicateField === "email"
            ? "User already exists with this email. Please try another email."
            : duplicateField === "userName"
            ? "Username is already taken. Please choose a different username."
            : "Duplicate value detected. Please use different details.",
      });
    }

    // Handle validation or other known Mongoose errors gracefully
    if (e.name === "ValidationError") {
      const firstError = e.errors && Object.values(e.errors)[0];
      return res.status(400).json({
        success: false,
        message:
          firstError?.message ||
          "Invalid data provided. Please check your details and try again.",
      });
    }

    // Fallback for unexpected errors
    res.status(500).json({
      success: false,
      message:
        "Some error occurred while registering. Please try again in a moment.",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("loginUser: JWT_SECRET is not set (check Render/host env vars)");
      return res.status(500).json({
        success: false,
        message: "Server configuration error. Please contact support.",
      });
    }

    const checkUser = await User.findOne({ email: email.toLowerCase() });
    if (!checkUser)
      return res.status(400).json({
        success: false,
        message: "User doesn't exist! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.error("Error in loginUser:", e.message || e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" }).json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
