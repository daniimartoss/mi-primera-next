import Link from "next/link";

export function LinksDeEjemplo() {
return (
    <nav className="flex gap-3 p-3">
    <Link className="underline" href="/users/dani">Ir al perfil de dani</Link>
    <Link className="underline" href="/users/agustin">Ir al perfil de agustin</Link>
    </nav>
);
}
