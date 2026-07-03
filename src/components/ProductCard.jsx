import { useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "https://placehold.co/400x400?text=No+Image";

export default function ProductCard({ product }) {
  const [imgSrc, setImgSrc] = useState(product.images?.[0] || FALLBACK_IMG);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      <div className="flex h-44 items-center justify-center bg-gray-50 p-4 dark:bg-gray-800">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(FALLBACK_IMG)}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
          {product.name}
        </h3>
        <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">${product.price}</p>
      </div>
    </Link>
  );
}
