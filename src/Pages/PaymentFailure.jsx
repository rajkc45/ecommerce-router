import { Link, useSearchParams } from "react-router-dom";

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="max-w-md mx-auto mt-16 p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-gray-600 mb-6">
        Something went wrong or the payment was cancelled.
      </p>
      {orderId && (
        <Link
          to="/checkout"
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700"
        >
          Try Again
        </Link>
      )}
    </div>
  );
}