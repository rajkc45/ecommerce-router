import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/Productcard";
import Loading from "./Loading";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://ecommerce-api-ten-jade.vercel.app/api/v1/products?category=${category}`
      : "https://ecommerce-api-ten-jade.vercel.app/api/v1/products";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.data.items, "products");
        setProducts(res.data.data.items || []);
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
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {category ? `Category: ${category}` : "All Products"}
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">{products.length} items</span>
      </div>

      {products.length === 0 ? (
        <div className="flex h-[40vh] items-center justify-center">
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
