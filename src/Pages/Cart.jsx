import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshCartCount } = useContext(CartContext);

  const getCart = async () => {
    try {
      const response = await api.get("/cart");
      const cart = response.data.data;

      setCartItems(cart.items || []);

      const total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      setTotal(total);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCartItems([]);
      setTotal(0);
      refreshCartCount();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { amount: total } });
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading Cart...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <h2>YOUR CART IS EMPTY</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 border rounded-lg p-4 mb-4"
            >
              <img
                src={item.product.image || "https://placehold.co/200x200?text=No+Image"}
                alt={item.product.name}
                onError={(e) => { e.target.src = "https://placehold.co/200x200?text=No+Image"; }}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                <p>Price: NPR {item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="font-semibold">
                  Total: NPR {item.product.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Grand Total: ${total}</h2>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Delete All
              </button>

              <button
                onClick={handleCheckout}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}