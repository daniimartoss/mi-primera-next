"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Button from "../components/Button";

const posts = [
"Post 1", "Post 2", "Post 3", "Post 4", "Post 5",
"Post 6", "Post 7", "Post 8", "Post 9", "Post 10"
];

function BlogContent() {
const searchParams = useSearchParams();
const page = Number(searchParams.get('page')) || 1;
const router = useRouter();

const min = (page - 1) * 3;
const max = min + 3;
const posts2 = posts.slice(min, max);
const paginasTotal = Math.ceil(posts.length / 3);

const paginaAnterior = () => {
    if (page > 1) router.push(`/blog?page=${page - 1}`);
};

const paginaSiguiente = () => {
    if (page < paginasTotal) router.push(`/blog?page=${page + 1}`);
};

const isAnteriorDisabled = page <= 1;
const isSiguienteDisabled = page >= paginasTotal;

return (
    <div className="flex flex-col justify-center items-center">
    <h1 className="text-2xl mb-4">Posts</h1>

    {posts2.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 mb-4">
        {posts2.map((e) => (
            <div key={e} className="p-5 border-emerald-600 border-2 text-center">
            {e}
            </div>
        ))}
        </div>
    ) : (
        <p className="p-5 text-red-600 mb-4">No hay posts</p>
    )}

    <div className="flex gap-4 mt-2">
        <Button text="Anterior" onClick={paginaAnterior} disabled={isAnteriorDisabled} />
        <Button text="Siguiente" onClick={paginaSiguiente} disabled={isSiguienteDisabled} />
    </div>

    <p className="mt-2 text-sm text-gray-600">
        Página {page} de {paginasTotal}
    </p>
    </div>
);
}

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContent />
        </Suspense>
    );
}
