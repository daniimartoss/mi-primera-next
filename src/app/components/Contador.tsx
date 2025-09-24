// app/components/Contador.tsx
"use client";
import { useState } from "react";

export default function Contador({ initialValue = 0 }: { initialValue?: number }) {
const [count, setCount] = useState(initialValue);
return (
    <div>
    <button 
        className="bg-amber-700 rounded m-2 p-1 text-lg border-white border-2 
        hover:bg-blue-800 hover:scale-105 transition-all"
        onClick={() => setCount(count + 1)}
    >
        Clicks: {count}
    </button>

    <button 
        className="bg-amber-600 rounded mt-5 p-1 text-lg m-2 border-white border-2 hover:bg-blue-700
        hover:scale-105 transition-all "
        onClick={() => setCount(0)}
    >
        Restart
    </button>
    </div>
);
}
