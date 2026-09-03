import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("ESEWA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Create the order from the current cart
      const orderRes = await api.post("/orders");
      const order = orderRes.data.data;

      // 2. Create a payment record for that order
      await api.post("/payments", {
        orderId: order.id,
        method,
      });

      if (method === "COD") {
        // No gateway redirect needed — order is placed, payment stays PENDING
        // until fulfilled/collected on delivery
        navigate(`/payment/success?orderId=${order.id}&method=cod`);
        return;
      }

      // 3. ESEWA: ask backend to build the signed payload
      const initRes = await api.post("/payments/esewa/initiate", {
        orderId: order.id,
      });
      const { gatewayUrl, paymentData } = initRes.data.data;

      // 4. Auto-submit a hidden form to eSewa's gateway
      const form = document.createElement("form");
      form.method = "POST";
      form.action = gatewayUrl;

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.log(err.response?.data || err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex gap-3 mb-6 justify-center">
        <button
          onClick={() => setMethod("ESEWA")}
          className={`px-4 py-2 rounded-lg font-medium border ${
            method === "ESEWA"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"
          }`}
        >
          Pay with eSewa
        </button>

        <button
          onClick={() => setMethod("COD")}
          className={`px-4 py-2 rounded-lg font-medium border ${
            method === "COD"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400"
          }`}
        >
          Cash on Delivery
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        {method === "ESEWA"
          ? "You'll be redirected to eSewa to complete payment."
          : "Pay in cash when your order is delivered."}
      </p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 w-full"
      >
        {loading ? "Processing..." : method === "ESEWA" ? "Pay with eSewa" : "Place Order (COD)"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}