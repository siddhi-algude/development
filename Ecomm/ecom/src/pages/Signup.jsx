// // // src/pages/Signup.jsx
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // export default function SignupPage() {
// //   const { requestSignup, error } = useAuth();
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //   });
// //   const navigate = useNavigate();

// //   const update = (key, value) =>
// //     setForm((prev) => ({ ...prev, [key]: value }));

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const ok = requestSignup(form);
// //     if (ok) {
// //       navigate("/otp?mode=signup");
// //     }
// //   };

// //   return (
// //     <div className="container-max py-10 flex justify-center">
// //       <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
// //         <h1 className="text-xl font-semibold text-center">Create Account</h1>
// //         <p className="text-xs text-gray-500 text-center">
// //           This is a mock flow. OTP is always{" "}
// //           <span className="font-mono font-semibold">123456</span>.
// //         </p>

// //         {error && (
// //           <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
// //             {error}
// //           </div>
// //         )}

// //         <form className="space-y-4" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block text-sm font-medium mb-1">
// //               Full Name
// //             </label>
// //             <input
// //               className="w-full border rounded-lg px-3 py-2 text-sm"
// //               value={form.name}
// //               onChange={(e) => update("name", e.target.value)}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Email</label>
// //             <input
// //               type="email"
// //               className="w-full border rounded-lg px-3 py-2 text-sm"
// //               value={form.email}
// //               onChange={(e) => update("email", e.target.value)}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-1">Phone</label>
// //             <input
// //               type="tel"
// //               className="w-full border rounded-lg px-3 py-2 text-sm"
// //               value={form.phone}
// //               onChange={(e) => update("phone", e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-1">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               className="w-full border rounded-lg px-3 py-2 text-sm"
// //               value={form.password}
// //               onChange={(e) => update("password", e.target.value)}
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-black text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900"
// //           >
// //             Continue
// //           </button>
// //         </form>

// //         <button
// //           className="w-full text-sm text-fuchsia-600 mt-2"
// //           onClick={() => navigate("/login")}
// //         >
// //           Already have an account? Login
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/Signup.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function SignupPage() {
//   const { requestSignup, error, user } = useAuth();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   // 🔥 AUTO REDIRECT IF LOGGED IN
//   useEffect(() => {
//     if (user) navigate("/", { replace: true });
//   }, [user]);

//   const update = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const ok = requestSignup(form);
//     if (ok) navigate("/otp?mode=signup");
//   };

//   return (
//     <div className="container-max py-10 flex justify-center">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

//         <h1 className="text-xl font-semibold text-center">Create Account</h1>
//         <p className="text-xs text-gray-500 text-center">
//           OTP is always <b>123456</b>
//         </p>

//         {error && (
//           <div className="text-sm text-red-600 bg-red-50 border rounded-md px-3 py-2">
//             {error}
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Inputs unchanged */}

//           <button className="w-full bg-black text-white rounded-lg py-2 text-sm">
//             Continue
//           </button>
//         </form>

//         <button
//           className="w-full text-sm text-fuchsia-600 mt-2"
//           onClick={() => navigate("/login")}
//         >
//           Already have an account? Login
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { requestSignup, error, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 🔥 Auto redirect if logged in
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = requestSignup(form);
    if (ok) navigate("/otp?mode=signup");
  };

  return (
    <div className="container-max py-10 flex justify-center">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

        <h1 className="text-xl font-bold text-center">Create Account</h1>
        <p className="text-xs text-gray-500 text-center">
          OTP is always <b>123456</b>
        </p>

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full border rounded-lg px-3 py-2"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 text-sm"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <button
            className="text-fuchsia-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
