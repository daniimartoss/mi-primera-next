
const productos = ["champu", "cera", "peine"];


export default function SearchPage(
    {searchParams,} : {searchParams: {q?: string};}) {

        const query = searchParams.q?.toLowerCase() || "";


        const resultados = productos.filter( s => s.includes(query));

        return (
            <div>
                <h1 className="text-2xl font-bold">Buscar Producto</h1>
                <p>Busqueda: <span className="font-bold">{query}</span></p>
                
                {resultados.length > 0 ? (<ul>
                    {resultados.map(s => (<li key={s}>
                        {s}
                    </li>))}
                </ul>) : (<p>No hay resultados</p>)}

            </div>
        )


    }