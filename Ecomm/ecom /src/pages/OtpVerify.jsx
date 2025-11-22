// src/pages/OtpVerify.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OtpVerifyPage() {
  const { pending, verifyOtp, error, otpCode } = useAuth();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // If no pending, redirect back to login
  useEffect(() => {
    if (!pending) {
      navigate("/login", { replace: true });
    }
  }, [pending, navigate]);

  const modeParam = new URLSearchParams(location.search).get("mode");
  const mode = modeParam || pending?.mode || "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = verifyOtp(code.trim());
    if (ok) {
      navigate("/", { replace: true });
    }
  };

  const label =
    mode === "signup" ? "Verify & Create Account" : "Verify & Login";

  return (
    <div className="container-max py-10 flex justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Enter OTP
        </h1>
        <p className="text-xs text-gray-500 text-center">
          Mock OTP has been "sent". For now, use{" "}
          <span className="font-mono font-semibold">{otpCode}</span>.
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              6 digit OTP
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm tracking-[0.3em] text-center font-mono"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900"
          >
            {label}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Resend OTP is not wired to email yet – this is a mock flow.
        </p>
      </div>
    </div>
  );
}
