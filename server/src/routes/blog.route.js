import express from "express";
import {
    createBlog,
    getAllBlogs,
    getBlogBySlug,
    updateBlog,
    deleteBlog,
    toggleBlogLike,
    myBlogs
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/create", verifyJWT, upload.single("coverImage"), createBlog);
router.get("/all", getAllBlogs);
router.get("/my-blogs", verifyJWT, myBlogs);
router.get("/:slug", getBlogBySlug);
router.put("/update/:id", verifyJWT, updateBlog);
router.delete("/delete/:id", verifyJWT, deleteBlog);
router.post("/like/:id", verifyJWT, toggleBlogLike);



export default router;