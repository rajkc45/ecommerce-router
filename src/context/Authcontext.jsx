import { createContext, useState,useEffect } from "react";
import axios from "axios";

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
  useEffect(() => {
    userStatus();
  }, []);
  async function userStatus() {
    let token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      let response = await axios.get(
        "https://ecommerce-api-ten-jade.vercel.app/api/v1/auth/me",
      {headers: {
            Authorization: `Bearer ${token}`,
      }});
      console.log("userStaus", response);
      console.log(response.data.data.user);
      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem("accessToken");
      console.log("error", error);
      setUser(null);
    }
  }
  const value = {
    user: user,
    setUser: setUser,
    userStatus: userStatus,
    isAuthenticated: !!user,
    login,
    guestLogin,
    logout,
    //it is short form of if else(if authenticated true else false)
  };

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

