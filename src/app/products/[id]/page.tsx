"use client";

import { useParams } from "next/navigation";

const productos = [
{ id: 1, nombre: "Champú", precio: 7 },
{ id: 2, nombre: "Cera", precio: 5 },
{ id: 3, nombre: "Peine", precio: 3 },
];

export default function ProductsPage() {
const params = useParams();
const id = Number(params.id);

const producto = productos.find((e) => e.id === id);

if (!producto) {
    return <p className="text-red-600 text-center">Producto no encontrado</p>;
}

return (
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold">{producto.nombre}</h1>
    <p>Precio: {producto.precio}€</p>
    </div>
);
}
