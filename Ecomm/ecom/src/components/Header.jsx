 
// // // // import { Link, NavLink } from "react-router-dom";
// // // // import { useCart } from "../context/CartContext";
// // // // import { useWishlist } from "../context/WishlistContext";
// // // // import { useSearch } from "../context/SearchContext";


// // // // export default function Header() {
// // // //   const { totalCount } = useCart();
// // // //   const { wishlist } = useWishlist();
// // // //   const { searchQuery, setSearchQuery } = useSearch();

// // // //   const linkClass = ({ isActive }) =>
// // // //     isActive
// // // //       ? "text-gray-900 font-semibold"
// // // //       : "text-gray-700 hover:text-gray-900";

// // // //   return (
// // // //     <header className="border-b border-gray-200 bg-white">
// // // //       <div className="container-max flex items-center gap-6 h-16">
// // // //         {/* Brand */}
// // // //         <Link to="/" className="flex items-center gap-1">
// // // //           <span className="text-2xl font-extrabold text-fuchsia-600">
// // // //             Swift
// // // //           </span>
// // // //           <span className="text-2xl font-extrabold text-yellow-400">
// // // //             Kart
// // // //           </span>
// // // //         </Link>

// // // //         {/* Search bar */}
// // // //         <div className="flex-1 hidden md:block">
// // // //           <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
// // // //             <span className="text-gray-400 text-sm">🔍</span>
// // // //             <input
// // // //               className="bg-transparent flex-1 outline-none text-sm"
// // // //               placeholder="Search for products, brands and more"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {/* Right nav */}
// // // //         <nav className="flex items-center gap-4 text-sm">
// // // //           <button className="btn-ghost rounded-full text-sm px-3 py-1.5">
// // // //             Login
// // // //           </button>

// // // //           <NavLink to="/cart" className={linkClass}>
// // // //             <div className="relative flex items-center gap-1">
// // // //               <span>🛒</span>
// // // //               <span>Cart</span>
// // // //               {totalCount > 0 && (
// // // //                 <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
// // // //                   {totalCount}
// // // //                 </span>
// // // //               )}
// // // //             </div>
// // // //           </NavLink>

// // // //           <NavLink to="/contact" className={linkClass}>
// // // //             Contact&nbsp;Us
// // // //           </NavLink>
// // // //           <NavLink to="/wishlist" className={linkClass}>
// // // //             <div className="relative flex items-center gap-1">
// // // //               <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-fuchsia-500 text-white text-xs">
// // // //               ♥</span>

// // // //               <span>Wishlist</span>

// // // //               {wishlist.length > 0 && (
// // // //                 <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
// // // //                   {wishlist.length}
// // // //                 </span>
// // // //               )}
// // // //             </div>
// // // //           </NavLink>

// // // //         </nav>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }
// // // import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// // // import { useCart } from "../context/CartContext";
// // // import { useWishlist } from "../context/WishlistContext";
// // // import { useSearch } from "../context/SearchContext";

// // // export default function Header() {
// // //   const { totalCount } = useCart();
// // //   const { wishlist } = useWishlist();
// // //   const { searchQuery, setSearchQuery } = useSearch();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const linkClass = ({ isActive }) =>
// // //     isActive
// // //       ? "text-gray-900 font-semibold"
// // //       : "text-gray-700 hover:text-gray-900";

// // //   const handleSearchChange = (e) => {
// // //     const value = e.target.value;
// // //     setSearchQuery(value);

// // //     // As soon as user types something, go to /search
// // //     if (value.trim() && location.pathname !== "/search") {
// // //       navigate("/search");
// // //     }
// // //     // If they clear, we just stay wherever we are; /search will show all products.
// // //   };

// // //   return (
// // //     <header className="border-b border-gray-200 bg-white">
// // //       <div className="container-max flex items-center gap-6 h-16">
// // //         {/* Brand */}
// // //         <Link to="/" className="flex items-center gap-1">
// // //           <span className="text-2xl font-extrabold text-fuchsia-600">
// // //             Swift
// // //           </span>
// // //           <span className="text-2xl font-extrabold text-yellow-400">
// // //             Kart
// // //           </span>
// // //         </Link>

// // //         {/* Search bar */}
// // //         <div className="flex-1 hidden md:block">
// // //           <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
// // //             <span className="text-gray-400 text-sm">🔍</span>
// // //             <input
// // //               className="bg-transparent flex-1 outline-none text-sm"
// // //               placeholder="Search for products, brands and more"
// // //               value={searchQuery}
// // //               onChange={handleSearchChange}
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Right nav */}
// // //         <nav className="flex items-center gap-4 text-sm">
// // //           <button className="btn-ghost rounded-full text-sm px-3 py-1.5">
// // //             Login
// // //           </button>

// // //           <NavLink to="/cart" className={linkClass}>
// // //             <div className="relative flex items-center gap-1">
// // //               <span>🛒</span>
// // //               <span>Cart</span>
// // //               {totalCount > 0 && (
// // //                 <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
// // //                   {totalCount}
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </NavLink>

// // //           <NavLink to="/contact" className={linkClass}>
// // //             Contact&nbsp;Us
// // //           </NavLink>

// // //           <NavLink to="/wishlist" className={linkClass}>
// // //             <div className="relative flex items-center gap-1">
// // //               <span className="text-fuchsia-500">💜</span>
// // //               <span>Wishlist</span>
// // //               {wishlist.length > 0 && (
// // //                 <span className="absolute -top-2 -right-4 bg-fuchsia-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 shadow-sm">
// // //                   {wishlist.length}
// // //                 </span>
// // //               )}
// // //             </div>
// // //           </NavLink>
// // //         </nav>
// // //       </div>
// // //     </header>
// // //   );
// // // }
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import { useWishlist } from "../context/WishlistContext";
// // import { useSearch } from "../context/SearchContext";

// // export default function Header() {
// //   const { totalCount } = useCart();
// //   const { wishlist } = useWishlist();
// //   const { searchQuery, setSearchQuery } = useSearch();
// //   const navigate = useNavigate();

// //   // Update search text while typing
// //   const handleSearchChange = (e) => {
// //     setSearchQuery(e.target.value);
// //   };

// //   // Navigate ONLY on Enter
// //   const handleSearchSubmit = (e) => {
// //     if (e.key === "Enter") {
// //       navigate("/search");
// //     }
// //   };

// //   return (
// //     <header className="border-b border-gray-200 bg-white">
// //       <div className="container-max flex items-center gap-6 h-16">

// //         {/* Brand */}
// //         <Link to="/" className="flex items-center gap-1">
// //           <span className="text-2xl font-extrabold text-fuchsia-600">Swift</span>
// //           <span className="text-2xl font-extrabold text-yellow-400">Kart</span>
// //         </Link>

// //         {/* Search Bar */}
// //         <div className="flex-1 hidden md:block">
// //           <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
// //             <span className="text-gray-400 text-sm">🔍</span>
// //             <input
// //               className="bg-transparent flex-1 outline-none text-sm"
// //               placeholder="Search for products, brands and more"
// //               value={searchQuery}
// //               onChange={handleSearchChange}
// //               onKeyDown={handleSearchSubmit}
// //             />
// //           </div>
// //         </div>

// //         {/* Right navigation */}
// //         <nav className="flex items-center gap-4 text-sm">
// //           <button className="btn-ghost rounded-full text-sm px-3 py-1.5">Login</button>

// //           {/* CART */}
// //           <NavLink to="/cart" className="text-gray-700 hover:text-gray-900">
// //             <div className="relative flex items-center gap-1">
// //               🛒 Cart
// //               {totalCount > 0 && (
// //                 <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
// //                   {totalCount}
// //                 </span>
// //               )}
// //             </div>
// //           </NavLink>

// //           {/* WISHLIST */}
// //           <NavLink to="/wishlist" className="text-gray-700 hover:text-gray-900">
// //             <div className="relative flex items-center gap-1">
// //               💜 Wishlist
// //               {wishlist.length > 0 && (
// //                 <span className="absolute -top-2 -right-4 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
// //                   {wishlist.length}
// //                 </span>
// //               )}
// //             </div>
// //           </NavLink>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // }

// // src/components/Header.jsx

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useSearch } from "../context/SearchContext";
// import { useAuth } from "../context/AuthContext";
// import { useTranslation } from "react-i18next";


// export default function Header() {  
//   const [langMenu, setLangMenu] = useState(false);

//   const { t, i18n } = useTranslation();
//   const { totalCount } = useCart();
//   const { wishlist } = useWishlist();
//   const { searchQuery, setSearchQuery } = useSearch();
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     if (e.key === "Enter") navigate("/search");
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const handleSignupClick = () => {
//     navigate("/signup");
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="border-b border-gray-200 bg-white">
//        <button onClick={() => i18n.changeLanguage("ar")}>EN</button>
//        <button onClick={() => i18n.changeLanguage("fr")}>HI</button>

//       <div className="container-max flex items-center gap-6 h-16">
//         {/* Brand */}
//         <Link to="/" className="flex items-center gap-1">
//           <span className="text-2xl font-extrabold text-fuchsia-600">
//             Swift
//           </span>
//           <span className="text-2xl font-extrabold text-yellow-400">
//             Kart
//           </span>
//         </Link>

//         {/* Search bar */}
//         <div className="flex-1 hidden md:block">
//           <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
//             <span className="text-gray-400 text-sm">🔍</span>
//             <input
//               className="bg-transparent flex-1 outline-none text-sm"
//               placeholder="Search for products, brands and more"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onKeyDown={handleSearchSubmit}
//             />
//           </div>
//         </div>

//         {/* Right nav */}
//         <nav className="flex items-center gap-4 text-sm">
//           {/* Auth area */}
//           {!user ? (
//             <>
//               <button
//                 className="btn-ghost rounded-full text-sm px-3 py-1.5"
//                 onClick={handleLoginClick}
//               >
//                { t("auth.login")}
//               </button>
//               <button
//                 className="hidden sm:inline-flex btn-ghost rounded-full text-sm px-3 py-1.5 border border-gray-300"
//                 onClick={handleSignupClick}
//               >
//                 {t("auth.signup")}
//               </button>
//             </>
//           ) : (
//             <div className="flex items-center gap-2">
//               <span className="text-gray-700">
//                 Hi,&nbsp;
//                 <span className="font-semibold">
//                   {user.name?.split(" ")[0] || "User"}
//                 </span>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="btn-ghost rounded-full text-sm px-3 py-1.5"
//               >
//                 Logout
//               </button>
//             </div>
//           )}

//           {/* Cart */}
//           <NavLink to="/cart" className="text-gray-700 hover:text-gray-900">
//             <div className="relative flex items-center gap-1">
//               🛒{ t("nav.cart")}
//               {totalCount > 0 && (
//                 <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
//                   {totalCount}
//                 </span>
//               )}
//             </div>
//           </NavLink>

//           {/* Wishlist */}
//           <NavLink to="/wishlist" className="text-gray-700 hover:text-gray-900">
//             <div className="relative flex items-center gap-1">
//               💜 {t("nav.wishlist")}
//               {wishlist.length > 0 && (
//                 <span className="absolute -top-2 -right-4 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
//                   {wishlist.length}
//                 </span>
//               )}
//             </div>
//           </NavLink>
//         </nav>
//       </div>
//     </header>
//   );
// }

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const [langMenu, setLangMenu] = useState(false);

  const { t, i18n } = useTranslation();
  const { totalCount } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => { if (e.key === "Enter") navigate("/search"); };
  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className="border-b border-gray-200 bg-white">
      
      {/* Language Selector */}
      <div className="relative inline-block ml-4 mt-2">
        <button
          onClick={() => setLangMenu(!langMenu)}
          className="p-2 text-lg hover:bg-gray-100 rounded-full"
        >
          🌐
        </button>

        {langMenu && (
          <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-50">
            <button
              onClick={() => { i18n.changeLanguage("en"); setLangMenu(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              English
            </button>
            <button
              onClick={() => { i18n.changeLanguage("hi"); setLangMenu(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              हिन्दी
            </button>
            <button
              onClick={() => { i18n.changeLanguage("fr"); setLangMenu(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Français
            </button>
            <button
              onClick={() => { i18n.changeLanguage("ar"); setLangMenu(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              العربية
            </button>
          </div>
        )}
      </div>

      <div className="container-max flex items-center gap-6 h-16">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-fuchsia-600">Swift</span>
          <span className="text-2xl font-extrabold text-yellow-400">Kart</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              className="bg-transparent flex-1 outline-none text-sm"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>

        {/* Right Nav */}
        <nav className="flex items-center gap-4 text-sm">

          {/* Auth */}
          {!user ? (
            <>
              <button
                className="btn-ghost rounded-full text-sm px-3 py-1.5"
                onClick={handleLoginClick}
              >
                {t("auth.login")}
              </button>
              <button
                className="hidden sm:inline-flex btn-ghost rounded-full text-sm px-3 py-1.5 border border-gray-300"
                onClick={handleSignupClick}
              >
                {t("auth.signup")}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-700">
                Hi,&nbsp;<span className="font-semibold">
                  {user.name?.split(" ")[0] || "User"}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="btn-ghost rounded-full text-sm px-3 py-1.5"
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart */}
          <NavLink to="/cart" className="text-gray-700 hover:text-gray-900">
            <div className="relative flex items-center gap-1">
              🛒 {t("nav.cart")}
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                  {totalCount}
                </span>
              )}
            </div>
          </NavLink>

          {/* Wishlist */}
          <NavLink to="/wishlist" className="text-gray-700 hover:text-gray-900">
            <div className="relative flex items-center gap-1">
              💜 {t("nav.wishlist")}
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-fuchsia-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </div>
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

