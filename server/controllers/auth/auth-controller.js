const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check for existing user by email or username so we can
    // return a clear message instead of a 500 from unique index errors.
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      const isEmailTaken = existingUser.email === email;
      const isUserNameTaken = existingUser.userName === userName;

      return res.status(400).json({
        success: false,
        message: isEmailTaken && isUserNameTaken
          ? "Username and email already exist. Please use different ones."
          : isEmailTaken
          ? "User already exists with this email. Please try another email."
          : "Username is already taken. Please choose a different username.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
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
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
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
    console.log(e);
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
