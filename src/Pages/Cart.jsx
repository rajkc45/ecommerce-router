import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  
  const getCart = async () => {
    try {
      const response = await api.get(
        "/cart",
        
      );

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
      await api.delete(
        "/cart",
      );

      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.log(error.response?.data || error);
    }
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
        <h2>kindim kindim 🤪.</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 border rounded-lg p-4 mb-4"
            >
              <img
                src={item.product.images}
                alt={item.product.title}
                className="w-28 h-28 object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {item.product.title}
                </h2>

                <p>Price: ${item.product.price}</p>

                <p>Quantity: {item.quantity}</p>

                <p className="font-semibold">
                  Total: ${item.product.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Grand Total: ${total}
            </h2>

            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Delete All
            </button>
          </div>
        </>
      )}
    </div>
  );
}