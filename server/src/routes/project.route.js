import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject,
    myProjects,
    toggleLike,
    toggleSave
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/create", verifyJWT, upload.single("thumbnail"), createProject);
router.get("/all", getAllProjects);
router.get("/my-projects", verifyJWT, myProjects);
router.get("/:id", getProjectById);
router.delete("/delete/:id", verifyJWT, deleteProject);
router.put("/update/:id", verifyJWT, updateProject);
router.post("/like/:id", verifyJWT, toggleLike);
router.post("/save/:id", verifyJWT, toggleSave);

export default router;