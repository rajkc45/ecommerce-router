import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-gray-400">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Back
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            {product.category}
          </p>

          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-sm font-medium text-yellow-700">
              ★ {product.rating}
            </span>
          </div>

          <p className="leading-relaxed text-gray-600">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}