import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=30")
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  

  return (
    <div>
      <Hero />

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Featured Products</h2>
        <span className="text-xs text-gray-400">
          {products.length} items
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
