"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success) setUser(data.data);
    } catch {
      // not authenticated
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    setUser(data.data.user);
    return data;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const signup = async (userData) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    return data;
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signup, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
