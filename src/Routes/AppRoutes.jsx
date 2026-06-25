import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Categories from "../Pages/Categories";
import ProductDetails from "../Pages/ProductDetails";
import SignIn from "../Pages/SignIn";
import MainLayout from "../components/MainLayout";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center text-gray-500">
            Page not found
          </div>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
