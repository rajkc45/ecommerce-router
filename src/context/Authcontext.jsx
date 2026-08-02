import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(
    () => Boolean(localStorage.getItem("accessToken"))
  );

  const userStatus = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return true;
    }

    try {
      const response = await api.get("/auth/me");

      console.log("User Status:", response.data);

      const data = response.data?.data ?? response.data;
      const userData = data?.user ?? data;

      if (!userData) {
        throw new Error("Unexpected /auth/me response shape");
      }

      setUser(userData);
      return true;
    } catch (error) {
      console.error(error);

      localStorage.removeItem("accessToken");
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const guestLogin = () => {
    setUser({
      name: "Guest",
      email: "guest@store.com",
    });
  };

  // Check logged-in user when app starts
  useEffect(() => {
    userStatus();
  }, [userStatus]);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    userStatus,
    loading,
    isAuthenticated: !!user,
    guestLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}