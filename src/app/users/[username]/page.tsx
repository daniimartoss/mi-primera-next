// app/users/[username]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function UserPage() {
// 1) Extraemos el parámetro dinámico de la URL
const params = useParams();
const username = params.username as string;

// 2) Devolvemos JSX con ese dato
return (
    <div className="p-6">
    <h1 className="text-2xl font-bold">Perfil de {username}</h1>
    <p className="mt-2">
        Esta página es dinámica. El valor de <code>[username]</code> viene de la URL.
    </p>
    <ul className="list-disc ml-6 mt-4">
        <li>Prueba con <code>/users/dani</code></li>
        <li>Prueba con <code>/users/agustin</code></li>
        <li>Prueba con <code>/users/loquequieras</code></li>
    </ul>
    </div>
);
}
