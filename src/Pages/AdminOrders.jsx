import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "sonner";

const statusOptions = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const getOrders = async () => {
    try {
      const res = await api.get("/orders/all");
      setOrders(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await api.patch(`/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading orders...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl p-5 dark:border-gray-800">
              <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                <div>
                  <p className="font-semibold">{order.user?.name}</p>
                  <p className="text-sm text-gray-400">{order.user?.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()} · Order #{order.id.slice(-8)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                    {order.status}
                  </span>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className="text-sm border rounded-lg px-2 py-1 dark:bg-gray-900 dark:border-gray-700"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 flex justify-between items-center dark:border-gray-800">
                <span className="text-xs text-gray-400">
                  Payment: {order.payment?.method} · {order.payment?.status}
                </span>
                <span className="font-semibold">Total: ${order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}