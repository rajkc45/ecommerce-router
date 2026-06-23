import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-44 items-center justify-center bg-gray-50 p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="text-base font-bold text-indigo-600">${product.price}</p>
      </div>
    </Link>
  );
}