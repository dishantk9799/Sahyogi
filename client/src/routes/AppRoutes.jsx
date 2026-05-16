import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import { AuthProvider } from "../features/auth/context/AuthContext";
import AppLayout from "../shared/layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProjectList from "../features/project/pages/ProjectList";
import ProjectDetail from "../features/project/pages/ProjectDetail";
import ProjectForm from "../features/project/pages/ProjectForm";
import BlogList from "../features/blog/pages/BlogList";
import BlogDetail from "../features/blog/pages/BlogDetail";
import BlogForm from "../features/blog/pages/BlogForm";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Profile from "../features/user/pages/Profile";
import EditProfile from "../features/user/pages/EditProfile";
import SavedProjects from "../features/user/pages/SavedProjects";
import Home from "../features/dashboard/pages/Home";


function AppRoutes() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/projects" element={<ProjectList />} />
                        <Route path="/projects/:id" element={<ProjectDetail />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/blogs/:slug" element={<BlogDetail />} />
                        <Route path="/profile/:username" element={<Profile />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/projects/new" element={<ProjectForm />} />
                            <Route path="/blogs/new" element={<BlogForm />} />
                            <Route path="/profile/edit" element={<EditProfile />} />
                            <Route path="/saved-projects" element={<SavedProjects />} />
                        </Route>
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/projects" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}


export default AppRoutes;
