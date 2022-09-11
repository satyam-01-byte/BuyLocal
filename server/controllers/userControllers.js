import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc: POST user email & password & authenticate
//@command: POST /api/users/login
//@access: PUBLIC
//server user action handler

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email: email });
  if (foundUser && (await foundUser.matchPassword(password))) {
    res.json({
      _id: foundUser._id, //id
      name: foundUser.name,
      email: foundUser.email,
      mobileNum: foundUser.mobileNum,
      isAdmin: foundUser.isAdmin,
      token: generateToken(foundUser._id),
    });
  } else {
    res.status(401); //Unauthorised
    throw new Error("Incorrect email or password!");
  }
});

//@desc: register new user
//@command: POST /api/users/register
//@access: PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobileNum } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    mobileNum,
  });

  if (user) {
    res.status(201).json({
      _id: user._id, //id
      name: user.name,
      email: user.email,
      mobileNum: user.mobileNum,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc: GET user profile
//@command: GET /api/users/profile
//@access: PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

//@desc: Update user details
//@command: PUT /api/users/profile
//@access: PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.mobileNum) user.mobileNum = req.body.mobileNum;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobileNum: updatedUser.mobileNum,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export { authenticateUser, getUserProfile, registerUser, updateUserProfile };
