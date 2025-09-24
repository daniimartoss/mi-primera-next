
"use client";

import Button from "../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoToSearch from "../components/GoToSearch";

export default function AboutPage(
    {searchParams,} : {searchParams: {q?: string};}) {

const query = Number(searchParams.q) || 0;


const router = useRouter();
const [count, setCount] = useState(query);

const urlCambio = useEffect(() => {
    router.replace(`/about?q=${count}`);
}, [count]);




const incrementar = () => {setCount(count + 1)};
const decrementar = () => {setCount(count > 0 ? count - 1: 0)};
const reiniciar = () => {setCount(0)};


return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
        <h1 className="text-3xl mb-2">Estas en la página ABOUT</h1>

        <p>Clicks: {count}</p>

        <div className="grid grid-cols-3 gap-2">
            
        <Button text="Incrementar" onClick={incrementar}/>
        <Button text="Decrementar" onClick={decrementar} disabled={count === 0} />
        <Button text="Reiniciar" onClick={reiniciar}/>

        </div>
        <GoToSearch />
    </div>
);
}
