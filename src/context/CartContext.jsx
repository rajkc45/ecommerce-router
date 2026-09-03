import { createContext, useState, useCallback, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "./Authcontext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    if (!isAuthenticated) {
      setCartCount(0);
      return;
    }

    try {
      const res = await api.get("/cart");
      const items = res.data?.data?.items || [];
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}