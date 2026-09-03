import api from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      console.log(response.data);

      toast.success("Signup successful");

      navigate("/signin");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Signup failed";

      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm space-y-6">

        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">Create your account</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Join the store in a few seconds</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-4 dark:border-gray-800 dark:bg-gray-900">

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 dark:bg-red-900/20 dark:border-red-900/40">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(""); }}
              placeholder="Ray"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setError(""); }}
              placeholder="Kandel"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="analyst@example.com"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors dark:text-gray-500 dark:hover:text-indigo-400"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Confirm Password</label>
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-2 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Create Account
          </button>

          <p className="pt-1 text-center text-xs text-gray-400 dark:text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}