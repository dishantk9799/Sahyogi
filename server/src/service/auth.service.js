import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

// Register user
export const registerUser = async (name, username, email, password) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new ApiError(400, "User already exists");

    const user = await User.create({
        name,
        username,
        email,
        password
    });

    return user;
};


// Login user
export const loginUser = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) throw new ApiError(401, "Invalid password");

    const token = user.generateAccessToken();


    return { user, token };
};

// Logout
export const logoutUser = () => { return true; };