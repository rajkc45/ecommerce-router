import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto mt-16 p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-gray-600 mb-2">Your order has been confirmed.</p>
      {orderId && (
        <p className="text-sm text-gray-400 mb-6">Order ID: {orderId}</p>
      )}
      <Link to="/" className="text-indigo-600 font-semibold hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}