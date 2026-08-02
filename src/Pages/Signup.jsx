import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from 'sonner';

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const navigate                = useNavigate();

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

    const message =
      error.response?.data?.message || "Signup failed";

    setError(message);
    toast.error(message);
  }
};

  return (
    <div className="min-h-screen bg-[#080c10] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">

        
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/30 flex items-center justify-center text-xl">
            📦
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 mt-0.5">Create your account</p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl bg-[#0d1117] ring-1 ring-slate-800 p-6 space-y-4">

          {error && (
            <div className="rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20 px-3 py-2">
              <p className="text-xs text-rose-400">{error}</p>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(""); }}
              placeholder="Ray"
              className="w-full bg-[#080c10] ring-1 ring-slate-800 focus:ring-amber-500/40 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-700 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setError(""); }}
              placeholder="Kandel"
              className="w-full bg-[#080c10] ring-1 ring-slate-800 focus:ring-amber-500/40 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-700 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="analyst@example.com"
              className="w-full bg-[#080c10] ring-1 ring-slate-800 focus:ring-amber-500/40 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-700 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full bg-[#080c10] ring-1 ring-slate-800 focus:ring-amber-500/40 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-700 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Confirm Password</label>
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(""); }}
              placeholder="••••••••"
              className="w-full bg-[#080c10] ring-1 ring-slate-800 focus:ring-amber-500/40 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-700 transition-all"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-500 hover:bg-amber-400 text-[#080c10] font-semibold text-sm py-2.5 rounded-lg transition-colors mt-2"
          >
            Create Account
          </button>

          {/* Already have account */}
          <p className="text-center text-xs text-slate-500 pt-1">
            Already have an account?{" "}
            <Link to="/signin" className="text-amber-400 hover:text-amber-300 transition-colors">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}