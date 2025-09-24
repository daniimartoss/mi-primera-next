"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoToSearch() {
const router = useRouter();
const [term, setTerm] = useState("");

const handleSearch = () => {
    if (term.trim() !== "") {
    router.push(`/products?q=${term}`); 
    }
};

return (
    <div className="flex gap-2 mt-4">
    <input
        className="border px-2 py-1 rounded"
        placeholder="Buscar producto..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
    />
    <button
        className="bg-blue-600 text-white px-3 py-1 rounded"
        onClick={handleSearch}
    >
        Buscar
    </button>
    </div>
);
}
