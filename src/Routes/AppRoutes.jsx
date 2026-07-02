import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Categories from "../Pages/Categories";
import ProductDetails from "../Pages/ProductDetails";
import Login from "../Pages/Login";
import MainLayout from "../components/Mainlayout";
import SignUp from "../Pages/Signup";
import Cart from "../Pages/Cart";
import { ProtectedRoute, SemiProtectedRoute } from "./RouteGuard";


function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={
        <ProtectedRoute><Cart />
        </ProtectedRoute>
      } />
        
      </Route>

      <Route path="/signin" element={
        <SemiProtectedRoute>
          <Login />
          </SemiProtectedRoute>
        } />
      <Route path="/signup" element={
        <SemiProtectedRoute>
          <SignUp />
        </SemiProtectedRoute>
      } />
      
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center text-gray-500 dark:text-gray-400">
            Page not found
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
