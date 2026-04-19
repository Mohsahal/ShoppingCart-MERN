import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function registerUser(formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return (
        error.response?.data || {
          success: false,
          message: "An unexpected error occurred during registration.",
        }
      );
    }
  }

  async function loginUser(formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      setIsAuthenticated(false);
      return (
        error.response?.data || {
          success: false,
          message: "An unexpected error occurred during login.",
        }
      );
    }
  }

  async function logoutUser() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUser(null);
        setIsAuthenticated(false);
      }

      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      return (
        error.response?.data || {
          success: false,
          message: "An unexpected error occurred during logout.",
        }
      );
    }
  }

  async function checkAuth() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
