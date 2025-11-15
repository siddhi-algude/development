// // import { useRef } from "react";
// // import { cn } from "../utils/cn";

// // export default function HorizontalCarousel({ children, className }) {
// //   const ref = useRef(null);
// //   const scroll = (dir) => {
// //     const el = ref.current;
// //     if (!el) return;
// //     const amount = el.clientWidth * 0.9;
// //     el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
// //   };

// //   return (
// //     <div className={cn("relative", className)}>
// //       <button
// //         className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full w-10 h-10"
// //         onClick={() => scroll("left")}
// //         aria-label="Scroll left"
// //       >‹</button>
// //       <div
// //         ref={ref}
// //         className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
// //       >
// //         {children}
// //       </div>
// //       <button
// //         className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full w-10 h-10"
// //         onClick={() => scroll("right")}
// //         aria-label="Scroll right"
// //       >›</button>
// //     </div>
// //   );
// // }
// import { useRef } from "react";
// import cn from "../utils/cn";

// export default function HorizontalCarousel({ children, className }) {
//   const ref = useRef(null);

//   const scroll = (dir) => {
//     const el = ref.current;
//     if (!el) return;
//     const amount = el.clientWidth * 0.8;
//     el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
//   };

//   return (
//     <div className={cn("relative py-4", className)}>
//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         className="
//           hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 
//           bg-white shadow hover:shadow-lg rounded-full w-10 h-10 
//           items-center justify-center border text-xl
//         "
//       >
//         ‹
//       </button>

//       {/* Scrollable container */}
//       <div
//         ref={ref}
//         className="
//           flex gap-6 overflow-x-auto scroll-smooth px-2
//           snap-x snap-mandatory
//           [&::-webkit-scrollbar]:hidden
//         "
//       >
//         {children}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         className="
//           hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 
//           bg-white shadow hover:shadow-lg rounded-full w-10 h-10 
//           items-center justify-center border text-xl
//         "
//       >
//         ›
//       </button>
//     </div>
//   );
// }

import { useRef } from "react";
import cn from "../utils/cn";

export default function HorizontalCarousel({ children, className }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative py-4", className)}>
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 
                   z-20 bg-white shadow hover:shadow-lg rounded-full w-10 h-10 
                   items-center justify-center border text-xl"
      >
        ‹
      </button>

      <div
        ref={ref}
        className="
          flex gap-6 overflow-x-auto scroll-smooth px-2
          snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden
        "
      >
        {children}
      </div>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 
                   z-20 bg-white shadow hover:shadow-lg rounded-full w-10 h-10 
                   items-center justify-center border text-xl"
      >
        ›
      </button>
    </div>
  );
}
