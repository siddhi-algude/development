import { useRef } from "react";

export default function HorizontalCarousel({ children, className = "" }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative py-4 w-full overflow-hidden ${className}`}>
      
      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 
                   z-20 bg-white shadow hover:shadow-lg rounded-full w-10 h-10 
                   items-center justify-center border text-xl"
      >
        ‹
      </button>

      {/* SCROLLABLE TRACK (bounded!) */}
      <div
        ref={ref}
        className="
          flex gap-6 overflow-x-auto scroll-smooth px-2
          snap-x snap-mandatory
          [&::-webkit-scrollbar]:hidden
          w-full                 /* keeps inside page */
          max-w-full            /* prevents overflow beyond screen */
        "
      >
        {children}
      </div>

      {/* RIGHT BUTTON */}
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

