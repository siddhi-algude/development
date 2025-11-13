import { useRef } from "react";
import { cn } from "../utils/cn";

export default function HorizontalCarousel({ children, className }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full w-10 h-10"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >‹</button>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {children}
      </div>
      <button
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full w-10 h-10"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >›</button>
    </div>
  );
}
