"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const posts = [
    { id: 1, titulo: "Primer post", tipo: "recent" },
    { id: 2, titulo: "Post popular", tipo: "popular" },
    { id: 3, titulo: "Otro reciente", tipo: "recent" },
];

function PostsContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    
    const username = params.username as string;
    const sParam = searchParams.get('filter') || "";
    
    const visibles = sParam
    ? posts.filter((e) => e.tipo === sParam)
    : posts;

    return(
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Post de {username}</h1>
            <h2>Filtro: {sParam ? sParam : "Ninguno"}</h2>
            {visibles.map((e) => <p key={e.id}>- {e.titulo}</p>)}
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostsContent />
        </Suspense>
    );
}