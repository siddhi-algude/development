// // // src/components/CategoryStrip.jsx
// // import React from "react";

// // const CATEGORIES = [
// //   { label: "Fashion", icon: "👕" },
// //   { label: "Mobiles", icon: "📱" },
// //   { label: "Electronics", icon: "🎧" },
// //   { label: "Home & Furniture", icon: "🛋️" },
// //   { label: "Appliances", icon: "🧺" },
// //   { label: "Travel", icon: "✈️" },
// //   { label: "Beauty & More", icon: "💄" },
// // ];

// // export default function CategoryStrip() {
// //   return (
// //     <div className="border-b bg-white">
// //       <div className="container-max flex gap-6 overflow-x-auto py-3">
// //         {CATEGORIES.map((cat) => (
// //           <button
// //             key={cat.label}
// //             className="flex flex-col items-center gap-1 min-w-[72px] text-xs text-gray-700 hover:text-blue-600"
// //           >
// //             <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-lg shadow-sm">
// //               {cat.icon}
// //             </div>
// //             <span>{cat.label}</span>
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";

// const CATEGORIES = [
//   { label: "Fashion", icon: "👕" },
//   { label: "Mobiles", icon: "📱" },
//   { label: "Electronics", icon: "🎧" },
//   { label: "Home & Furniture", icon: "🛋️" },
//   { label: "Appliances", icon: "🧺" },
//   { label: "Travel", icon: "✈️" },
//   { label: "Beauty & More", icon: "💄" },
// ];

// export default function CategoryStrip() {
//   return (
//     <div className="border-b border-gray-200 bg-white">
//       <div className="container-max flex gap-6 overflow-x-auto py-3">
//         {CATEGORIES.map((cat) => (
//           <button
//             key={cat.label}
//             className="flex flex-col items-center gap-1 min-w-[72px] text-xs text-gray-700 hover:text-blue-600"
//           >
//             <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-lg shadow-sm">
//               {cat.icon}
//             </div>
//             <span>{cat.label}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";

const CATEGORIES = [
  { label: "Fashion", icon: "👕" },
  { label: "Mobiles", icon: "📱" },
  { label: "Electronics", icon: "🎧" },
  { label: "Home & Furniture", icon: "🛋️" },
  { label: "Appliances", icon: "🧺" },
  { label: "Travel", icon: "✈️" },
  { label: "Beauty & More", icon: "💄" },
];

export default function CategoryStrip() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container-max flex gap-6 overflow-x-auto py-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            className="flex flex-col items-center gap-1 min-w-[72px] text-xs text-gray-700 hover:text-fuchsia-600"
          >
            <div className="w-12 h-12 rounded-full bg-fuchsia-50 flex items-center justify-center text-lg shadow-sm">
              {cat.icon}
            </div>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
