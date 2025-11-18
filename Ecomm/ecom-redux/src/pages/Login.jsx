// // src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function LoginPage() {
//   const { requestLogin, error } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const ok = requestLogin(email.trim(), password);
//     if (ok) {
//       navigate("/otp?mode=login");
//     }
//   };

//   return (
//     <div className="container-max py-10 flex justify-center">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
//         <h1 className="text-xl font-semibold text-center">Login</h1>
//         <p className="text-xs text-gray-500 text-center">
//           Mock OTP login · use password you used during signup · OTP is always{" "}
//           <span className="font-mono font-semibold">123456</span>
//         </p>

//         {error && (
//           <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
//             {error}
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded-lg px-3 py-2 text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900"
//           >
//             Continue
//           </button>
//         </form>

//         <button
//           className="w-full text-sm text-fuchsia-600 mt-2"
//           onClick={() => navigate("/signup")}
//         >
//           New to SwiftKart? Create an account
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { requestLogin, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 AUTO-REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = requestLogin(email.trim(), password);
    if (ok) navigate("/otp?mode=login");
  };

  return (
    <div className="container-max py-10 flex justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

        <h1 className="text-xl font-semibold text-center">Login</h1>
        <p className="text-xs text-gray-500 text-center">
          Mock OTP login · OTP is <b>123456</b>
        </p>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border rounded-lg px-3 py-2 text-sm"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-black text-white rounded-lg py-2 text-sm">
            Continue
          </button>
        </form>

        <button
          className="w-full text-sm text-fuchsia-600 mt-2"
          onClick={() => navigate("/signup")}
        >
          New to SwiftKart? Create an account
        </button>
      </div>
    </div>
  );
}

