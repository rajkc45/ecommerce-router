import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import { ThemeProvider } from "./context/Themecontext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
      <Toaster/>
        <App />
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);