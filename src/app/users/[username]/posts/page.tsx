const posts = [
    { id: 1, titulo: "Primer post", tipo: "recent" },
    { id: 2, titulo: "Post popular", tipo: "popular" },
    { id: 3, titulo: "Otro reciente", tipo: "recent" },
];


export default function Page({params, searchParams,}: {params: {username: string}, searchParams: {filter?: string}}) {

    const {username} = params;
    const sParam = searchParams.filter || "";
    
    const visibles = sParam
    ? posts.filter((e) => e.tipo === sParam)
    : posts;

    return(
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Post de {username}</h1>
            <h2>Filtro: {sParam ? sParam : "Ninguno"}</h2>
            {visibles.map((e) => <p>- {e.titulo}</p>)}
        </div>
    )




}