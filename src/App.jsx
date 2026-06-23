import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="ml-60">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}