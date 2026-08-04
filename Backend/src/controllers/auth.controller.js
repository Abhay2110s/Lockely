import bcrypt from "bcrypt";

import User from "../models/User.js";
import OTP from "../models/Otp.js";

import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const otp = generateOTP();

    await OTP.findOneAndUpdate(
      {
        email,
        type: "EMAIL_VERIFICATION",
      },
      {
        email,
        otp,
        type: "EMAIL_VERIFICATION",
        expiresAt: new Date(
          Date.now() +
            Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000
        ),
      },
      {
        upsert: true,
        new: true,
      }
    );

    await sendEmail(
      email,
      "Email Verification OTP",
      `Your OTP is ${otp}. It expires in ${process.env.OTP_EXPIRE_MINUTES} minutes.`
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful. Verify your email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await OTP.findOne({
      email,
      otp,
      type: "EMAIL_VERIFICATION",
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }

    await User.findOneAndUpdate(
      { email },
      {
        isVerified: true,
      }
    );

    await OTP.deleteOne({
      _id: otpData._id,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify email first.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const otp = generateOTP();

    await OTP.findOneAndUpdate(
      {
        email,
        type: "LOGIN",
      },
      {
        email,
        otp,
        type: "LOGIN",
        expiresAt: new Date(
          Date.now() +
            Number(process.env.OTP_EXPIRE_MINUTES) * 60 * 1000
        ),
      },
      {
        upsert: true,
        new: true,
      }
    );

    await sendEmail(
      email,
      "Login OTP",
      `Your login OTP is ${otp}`
    );

    return res.status(200).json({
      success: true,
      message: "Login OTP sent to email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await OTP.findOne({
      email,
      otp,
      type: "LOGIN",
    });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (otpData.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }

    const user = await User.findOne({ email });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await OTP.deleteOne({
      _id: otpData._id,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  register,
  verifyEmailOTP,
  login,
  verifyLoginOTP,
  logout,
  profile,
};