import {
  validateInputs,
  hashPassword,
  comparePassword,
  GenSign,
} from "../../utils/common.js";
import { User } from "../../Models/Repository/UserRepository.js";

export const RegisterUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate inputs
    if (validateInputs(username, password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    // Check if user already exists
    const user = await User.findUser(username);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    // createUser
    const newUser = await User.createUser(username, hashedPassword);
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("error in register", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (validateInputs(username, password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    // Check if user exists
    const user = await User.findUser(username);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare passwords
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = await GenSign(payload, process.env.JWT_SECRET);
    // response
    let option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, option).status(200).json({
      success: true,
      token,
      user,
      message: "logged in Successfully",
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const userDashboard = async (req, res) => {
  const {id} = req.user;
  try {
    const userChats = await User.findUserChats(id);
    if(!userChats || userChats.length === 0){
      return res.status(400).json({
        success:false,
        message:"No chats found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "User chats found successfully",
      data: userChats,
    })
  } catch (error) {
    console.log("error in userDashboard", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}