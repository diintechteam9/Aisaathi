const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const jwtToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        clientId: user.clientId,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { email, name, picture, emailVerified, googleId } = req.googleUser;
    const clientId = req.clientId;
    console.log(clientId)
    let user = await User.findOne({ email });
    console.log(user)
    if (user) {
      const token = generateToken(user._id);
      if (!user.isprofileCompleted) {
        return res.status(200).json({
          success: true,
          message: "profile incomplete",
          step: "basic",
          isprofileCompleted:false,
          jwt_token:token,
          id: user._id,
          email: user.email,
          name: user.name,
          clientId:clientId

        });
      } 
      else {
        return res.status(200).json({
          success: true,
          message: "Profile complete",
          step: "done",
          jwt_token:token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isprofileCompleted: user.isprofileCompleted,
            isGoogleUser: user.isGoogleUser,
            googlePicture: user.googlePicture,
            emailVerified: user.emailVerified,
            clientId:clientId
          },
        });
      }
    } else {
      // New user, create with Google info, isprofileCompleted: false
      const newuser = await User.create({
        name,
        email,
        password: "",
        isGoogleUser: true,
        googleId,
        googlePicture: picture,
        emailVerified,
        isprofileCompleted: false,
        clientId
      });
      const token = generateToken(newuser._id);
      return res.status(200).json({
        success: true,
        message: "profile incomplete",
        step: "basic",
        jwt_token:token,
        id: newuser._id,
        email: newuser.email,
        name: newuser.name,
        clientId:clientId

      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

const getuserProfile = async (req,res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if(!user)
    {
      res.status(400).json({message:"user not found"})
    }
    res.status(200).json({
      success:true,
      message:"userprofile retrieved successfully",
      user:user
    })

  } 
  catch (error) {
    res.status(500).json(error,{message:"Internal Server Error"})
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("clientId",req.clientId)
    const clientId = req.clientId
    console.log(clientId)
    if (!clientId) {
      return res
        .status(400)
        .json({ success: false, message: "user client ID is required" });
    }
    // Check if user exists with this userId
    const client = await Client.findOne({ userId:clientId });
    if (!client) {
      return res
        .status(400)
        .json({ success: false, message: "No user found with this User ID" });
    }

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res
        .status(401)
        .json({ success: false, message: "user already registered" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      clientId,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        clientId: user.clientId,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  googleLogin,
  getuserProfile,
};
