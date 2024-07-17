import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [requestID, setRequestID] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRequestID(decoded._doc?.UID);
        const userRole = decoded._doc?.role;
        setRole(userRole);
        localStorage.setItem("userRole", userRole);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        setToken(null);
        setRole(null);
        setRequestID(null);
      }
    }
  }, [token]);

  const login = (newToken) => {
    console.log(newToken);
    if (typeof newToken === "string") {
      setToken(newToken);
      localStorage.setItem("authToken", newToken);
      try {
        const decoded = jwtDecode(newToken);
        setRequestID(decoded._doc?.UID);
        const userRole = decoded._doc?.role;
        setRole(userRole);
        localStorage.setItem("userRole", userRole);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token during login:", error);
        // Handle invalid token error
      }
    } else {
      console.error("Invalid token provided during login");
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setRequestID(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ token, role, requestID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};