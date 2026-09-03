import { useEffect, useState } from "react";
import api from "../api/axios";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.data || []);
      } catch (error) {
        console.log(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-10">Loading orders...</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-5 dark:border-gray-800">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">Order #{order.id.slice(-8)}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 mb-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold dark:border-gray-800">
                <span>Total</span>
                <span>NPR {order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}