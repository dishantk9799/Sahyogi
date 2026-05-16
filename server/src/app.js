import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import projectRoute from "./routes/project.route.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import dashboardRoute from "./routes/dashboard.route.js";

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);
app.use("/api/dashboard", dashboardRoute);

app.use(errorMiddleware);

export default app;
