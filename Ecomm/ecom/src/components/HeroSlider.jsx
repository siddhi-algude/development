import { useEffect, useState } from "react";
import cn from "../utils/cn";

const slides = [
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-modern-chair-presentation-1042-large.mp4",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden relative shadow">
      {slide.type === "video" ? (
        <video
          src={slide.src}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={slide.src}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
