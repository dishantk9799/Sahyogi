import express from "express";
import {
    getProfile,
    updateProfile,
    toggleFollow,
    savedProjects
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/profile/:username", getProfile);
router.put("/update-profile", verifyJWT,
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        },
        {
            name: "bannerImage",
            maxCount: 1
        }
    ]),
    updateProfile);
router.post("/follow/:id", verifyJWT, toggleFollow);
router.get("/saved-projects", verifyJWT, savedProjects);

export default router;