import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { currentUser, loginUser, logoutUser, registerUser } from "../api/auth.api";
import { getApiData, getApiMessage } from "../../../shared/utils/formatters";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const refreshUser = useCallback(async () => {
        try {
            const response = await currentUser();
            setUser(getApiData(response));
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = useCallback(async (payload) => {
        const response = await loginUser(payload);
        const data = getApiData(response);
        setUser(data);
        toast.success("Logged in");
        navigate("/dashboard");
        return data;
    }, [navigate]);

    const register = useCallback(async (payload) => {
        const response = await registerUser(payload);
        toast.success("Account created");
        navigate("/login");
        return getApiData(response);
    }, [navigate]);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
            toast.success("Logged out");
        } catch (error) {
            toast.error(getApiMessage(error, "Logout failed"));
        } finally {
            setUser(null);
            navigate("/login");
        }
    }, [navigate]);

    const value = useMemo(() => ({
        user,
        loading,
        login,
        register,
        logout,
        refreshUser
    }), [user, loading, login, register, logout, refreshUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
