import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Loading from "./Loading";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://dummyjson.com/products/category/${category}`
      : "https://dummyjson.com/products?limit=30";

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          {category ? `Category: ${category}` : "All Products"}
        </h2>
        <span className="text-xs text-gray-400">{products.length} items</span>
      </div>

      {products.length === 0 ? (
        <div className="flex h-[40vh] items-center justify-center">
          <p className="text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
