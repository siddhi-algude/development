// // import { Link, NavLink } from "react-router-dom";
// // import { useCart } from "../context/CartContext";

// // export default function Header() {
// //   const { totalCount } = useCart();
// //   const active = ({ isActive }) => (isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black");

// //   return (
// //     <header className="border-b bg-white">
// //       <div className="container-max flex items-center justify-between h-16">
// //         <Link to="/" className="text-xl font-bold">ShopLite</Link>
// //         <nav className="flex items-center gap-6">
// //           <NavLink to="/" className={active} end>Home</NavLink>
// //           <NavLink to="/cart" className={active}>
// //             Cart {totalCount > 0 && <span className="ml-2 badge">{totalCount}</span>}
// //           </NavLink>
// //           <NavLink to="/contact" className={active}>Contact&nbsp;Us</NavLink>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }


// import { Link, NavLink } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// export default function Header() {
//   const { totalCount } = useCart();

//   const linkClass = ({ isActive }) =>
//     isActive
//       ? "text-gray-900 font-semibold"
//       : "text-gray-700 hover:text-gray-900";

//   return (
//     <header className="border-b border-gray-200 bg-white">
//       <div className="container-max flex items-center gap-6 h-16">
//         {/* Brand */}
//         <Link to="/" className="flex items-center gap-1">
//           <span className="text-2xl font-extrabold text-blue-600">Swift</span>
//           <span className="text-2xl font-extrabold text-yellow-500">Kart</span>
//         </Link>

//         {/* Search */}
//         <div className="flex-1 hidden md:block">
//           <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
//             <span className="text-gray-400 text-sm">🔍</span>
//             <input
//               className="bg-transparent flex-1 outline-none text-sm"
//               placeholder="Search for products, brands and more"
//             />
//           </div>
//         </div>

//         {/* Right nav */}
//         <nav className="flex items-center gap-4 text-sm">
//           <button className="btn-ghost rounded-full text-sm px-3 py-1.5">
//             Login
//           </button>

//           <NavLink to="/cart" className={linkClass}>
//             <div className="flex items-center gap-1">
//               <span>🛒</span>
//               <span>Cart</span>
//               {totalCount > 0 && (
//                 <span className="badge ml-1">{totalCount}</span>
//               )}
//             </div>
//           </NavLink>

//           <NavLink to="/contact" className={linkClass}>
//             Contact&nbsp;Us
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalCount } = useCart();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-900 font-semibold"
      : "text-gray-700 hover:text-gray-900";

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container-max flex items-center gap-6 h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-fuchsia-600">
            Swift
          </span>
          <span className="text-2xl font-extrabold text-yellow-400">
            Kart
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              className="bg-transparent flex-1 outline-none text-sm"
              placeholder="Search for products, brands and more"
            />
          </div>
        </div>

        {/* Right nav */}
        <nav className="flex items-center gap-4 text-sm">
          <button className="btn-ghost rounded-full text-sm px-3 py-1.5">
            Login
          </button>

          <NavLink to="/cart" className={linkClass}>
            <div className="relative flex items-center gap-1">
              <span>🛒</span>
              <span>Cart</span>
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
                  {totalCount}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contact&nbsp;Us
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
