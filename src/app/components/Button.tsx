"use client";

import { count } from "console";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({text, onClick, disabled}: ButtonProps) {
    return (
        <button 
        onClick={onClick}
        className="bg-blue-600 text-white px-3 py-1 m-2 rounded disabled:bg-amber-900" 
        disabled={disabled}>
            {text}
        </button>
    )
}