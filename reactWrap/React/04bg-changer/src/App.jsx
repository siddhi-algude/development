 
import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Orange", value: "orange" },
    { name: "Purple", value: "purple" },
    { name: "Pink", value: "pink" },
  ];

  return (
    <div
      className="w-screen h-screen items-center justify-center gap-8 duration-300"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-white text-5xl font-bold drop-shadow-lg">
        background color changer !
      </h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(c.value)}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-black shadow-md"
            style={{
              backgroundColor: c.value,
              color: "white",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
} 

export default App;
