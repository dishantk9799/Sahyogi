import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { registerUser, loginUser } from "../service/auth.service.js";
import User from "../models/user.model.js";

// Register
export const register = asyncHandler(async (req, res) => {

    const { name, username, email, password } = req.body;

    const user = await registerUser(
        name,
        username,
        email,
        password
    );

    return res.status(201).json(new ApiResponse(201, user, "Registered successfully"));

});


// Login
export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    const options = {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
        secure: process.env.NODE_ENV !== "development",
    };

    return res
        .cookie("JWT_token", token, options)
        .status(200)
        .json(new ApiResponse(200, user, "Login success"));

});


// Logout
export const logout = asyncHandler(async (req, res) => {

    return res
        .clearCookie("JWT_token")
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successful"));

});


// Current user
export const currentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "Current user"));

});