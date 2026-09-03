import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loading from "./Loading";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const categoryName = searchParams.get("categoryName");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await api.get("/products", {
        params: category ? { category } : {},
      });

      console.log(response.data.data.products);

      setProducts(response.data.data.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [category]);
  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <div className="mb-6 flex products-center justify-between">
       
       <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  {categoryName ? `Category: ${categoryName}` : "All Products"}
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">{products.length} products</span>
      </div>

      {products.length === 0 ? (
        <div className="flex h-[40vh] products-center justify-center">
          <p className="text-gray-400 dark:text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
