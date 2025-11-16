import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Attach token to axios by default
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      email,
      password,
    });

    setUser(res.data.user);
    setToken(res.data.token);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
  };

  const register = async (name, email, password) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
