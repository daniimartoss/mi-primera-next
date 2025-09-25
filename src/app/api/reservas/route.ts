// app/api/reservas/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/../../lib/prisma";

// GET /api/reservas  -> listar
export async function GET() {
try {
    const reservas = await prisma.reserva.findMany({
    orderBy: { id: "desc" },
    });
    return NextResponse.json(reservas, { status: 200 });
} catch (err) {
    console.error("GET /reservas error:", err);
    return NextResponse.json({ error: "Error al listar reservas" }, { status: 500 });
}
}

// POST /api/reservas  -> crear
export async function POST(req: Request) {
try {
    const body = await req.json() as {
    cliente?: string;
    servicio?: string;
    fecha?: string; // ISO string p.ej. "2025-09-21T10:00:00Z"
    };

    const { cliente, servicio, fecha } = body;

    // Validación mínima
    if (!cliente || !servicio || !fecha) {
    return NextResponse.json(
        { error: "Faltan campos: cliente, servicio y fecha son obligatorios" },
        { status: 400 }
    );
    }

    const fechaDate = new Date(fecha);
    if (isNaN(fechaDate.getTime())) {
    return NextResponse.json(
        { error: "Fecha inválida. Usa formato ISO, p.ej. 2025-09-21T10:00:00Z" },
        { status: 400 }
    );
    }

    const nueva = await prisma.reserva.create({
    data: { cliente, servicio, fecha: fechaDate },
    });

    return NextResponse.json(nueva, { status: 201 });
} catch (err) {
    console.error("POST /reservas error:", err);
    return NextResponse.json({ error: "Error al crear la reserva" }, { status: 500 });
}
}
