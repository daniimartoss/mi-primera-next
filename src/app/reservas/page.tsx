"use client";

import { useState, useEffect } from "react";

type Reserva = {
id: number;
cliente: string;
servicio: string;
fecha: string;
};

export default function ReservasPage() {
const [reservas, setReservas] = useState<Reserva[]>([]);
const [cliente, setCliente] = useState("");
const [servicio, setServicio] = useState("");
const [fecha, setFecha] = useState("");

// Cargar reservas al montar
useEffect(() => {
    fetch("/api/reservas", { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => setReservas(data));
}, []);

// Crear nueva reserva
const crearReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente, servicio, fecha }),
    });

    if (res.ok) {
    const nueva = await res.json();
    setReservas([nueva, ...reservas]);
    setCliente("");
    setServicio("");
    setFecha("");
    } else {
    const err = await res.json();
    alert("Error: " + err.error);
    }
};

// Eliminar reserva
const eliminarReserva = async (id: number) => {
    const res = await fetch(`/api/reservas/${id}`, { method: "DELETE" });
    if (res.ok) {
    // Filtramos la reserva borrada del estado
    setReservas(reservas.filter((r) => r.id !== id));
    } else {
    const err = await res.json();
    alert("Error al borrar: " + err.error);
    }
};

return (
    <div className="p-6 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Reservas</h1>

    {/* Formulario */}
    <form onSubmit={crearReserva} className="space-y-3 mb-6">
        <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="w-full border p-2 rounded"
        />
        <input
        type="text"
        placeholder="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        className="w-full border p-2 rounded"
        />
        <input
        type="datetime-local"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full border p-2 rounded"
        />
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        >
        Crear reserva
        </button>
    </form>

    {/* Lista */}
    <ul className="space-y-2">
        {reservas.map((r) => (
        <li
            key={r.id}
            className="border p-2 rounded flex justify-between items-center"
        >
            <div>
            <p>
                <strong>{r.cliente}</strong> — {r.servicio}
            </p>
            <p className="text-sm text-gray-600">
                {new Date(r.fecha).toLocaleString()}
            </p>
            </div>
            <button
            onClick={() => eliminarReserva(r.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
            Borrar
            </button>
        </li>
        ))}
    </ul>
    </div>
);
}
