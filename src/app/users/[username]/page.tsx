// app/users/[username]/page.tsx
// (Server Component por defecto; no hace falta "use client")

export default function UserPage({
params,
}: {
params: { username: string };
}) {
// 1) Extraemos el parámetro dinámico de la URL
const { username } = params;

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
