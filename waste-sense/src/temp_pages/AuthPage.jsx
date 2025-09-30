import React, { useState } from "react";
import { supabase } from "../supabase_client.jsx";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
    else navigate("/");
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMsg(error.message);
    else setConfirmationMsg("Signup successful! Check your email for confirmation.");
    setLoading(false);
  };

  // Leaf SVG component
  const Leaf = ({ className }) => (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="green"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C10 6 2 12 2 12s8 6 10 10c2-4 10-10 10-10s-8-6-10-10z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-green-100 overflow-hidden">
      {/* Left side leaves */}
      <Leaf className="absolute bottom-10 left-10 animate-float-slow" />
      <Leaf className="absolute bottom-20 left-16 w-12 h-12 animate-float" />
      <Leaf className="absolute bottom-28 left-6 w-10 h-10 animate-float-slower" />
      <Leaf className="absolute bottom-6 left-20 w-14 h-14 animate-float-slow" />

      {/* Right side leaves */}
      <Leaf className="absolute bottom-12 right-10 animate-float" />
      <Leaf className="absolute bottom-20 right-16 w-12 h-12 animate-float-slow" />
      <Leaf className="absolute bottom-28 right-6 w-10 h-10 animate-float-slower" />
      <Leaf className="absolute bottom-6 right-20 w-14 h-14 animate-float" />

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-1">WasteSense</h1>
        <p className="text-center text-gray-600 mb-6 italic">“Making World Green and Efficient”</p>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}
        {confirmationMsg && <p className="text-green-600 text-center mb-4">{confirmationMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/2"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      </div>

      {/* Leaf float animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float-slow { animation: float 4s ease-in-out infinite; }
          .animate-float-slower { animation: float 5s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
}

export default AuthPage;
