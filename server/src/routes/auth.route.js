import express from 'express';
import { login, register, logout, currentUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

let router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyJWT, currentUser);

export default router;