import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setUser({ email, name: email.split("@")[0] });
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  const guestLogin = () => {
    setUser({ name: "Guest", email: "guest@store.com" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
