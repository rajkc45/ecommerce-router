import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Categories from "../Pages/Categories";
import ProductDetails from "../Pages/ProductDetails";
import Login from "../Pages/Login";
import MainLayout from "../components/MainLayout";
import SignUp from "../Pages/Signup";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentFailure from "../Pages/PaymentFailure";
import AddProduct from "../Pages/AddProduct";
import { ProtectedRoute, SemiProtectedRoute, AdminRoute } from "./RouteGuard";
import Orders from "../Pages/Orders";
import AdminOrders from "../Pages/AdminOrders";


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
      <Route path="orders" element={
        <ProtectedRoute><Orders />
       </ProtectedRoute>
      } />
        <Route path="checkout" element={
        <ProtectedRoute><Checkout />
        </ProtectedRoute>
      } />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/failure" element={<PaymentFailure />} />
        <Route path="admin/add-product" element={
        <AdminRoute><AddProduct />
        </AdminRoute>
      } />
      <Route path="admin/orders" element={
  <AdminRoute><AdminOrders />
  </AdminRoute>
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