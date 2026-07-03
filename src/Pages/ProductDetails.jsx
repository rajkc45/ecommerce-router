import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/Authcontext";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-api-ten-jade.vercel.app/api/v1/products/${id}`
        );
  
        setProduct(response.data.data.product);
        console.log(response.data.data.product);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
  
    getProduct();
  }, [id]);
  const addToCart = async () => {
    if (user?.email === "guest@store.com") {
      toast.error("Sign in to add items to your cart");
      return;
    }
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    const response = await axios.post(
      "https://ecommerce-api-ten-jade.vercel.app/api/v1/cart/items",
      {
        productId: product.id,
        quantity: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  const getCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://ecommerce-api-ten-jade.vercel.app/api/v1/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  getCart();
}, []);
  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Back
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8 dark:bg-gray-800">
          <img
            src={product.images?.[0] || "https://placehold.co/600x600?text=No+Image"}
            alt={product.name}
            onError={(e) => { e.target.src = "https://placehold.co/600x600?text=No+Image"; }}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            {product.slug}
          </p>

          <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {product.name}
          </h1>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              ★ {product.rating}
            </span>
          </div>

          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          <button
            onClick={() => addToCart(product)}
            disabled={user?.email === "guest@store.com"}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {user?.email === "guest@store.com" ? "Sign in to purchase" : "Add To CART"}
          </button>
        </div>
      </div>
    </div>
  );
}
