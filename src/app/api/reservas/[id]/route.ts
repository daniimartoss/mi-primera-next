// app/api/reservas/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

/** Utilidad: convertir params.id a número y validar */
function parseId(idParam: string) {
const id = Number(idParam);
if (!Number.isFinite(id) || id <= 0) return null;
return id;
}

/* ===========================
GET /api/reservas/:id
Devuelve una reserva concreta
=========================== */
export async function GET(
_req: Request,
{ params }: { params: Promise<{ id: string }> }
) {
const resolvedParams = await params;
const id = parseId(resolvedParams.id);
if (id === null) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
}

const reserva = await prisma.reserva.findUnique({ where: { id } });
if (!reserva) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
}

return NextResponse.json(reserva, { status: 200 });
}

/* ===========================
PUT /api/reservas/:id
Actualiza una reserva (parcial o total)
Body JSON: { cliente?: string, servicio?: string, fecha?: string(ISO) }
=========================== */
export async function PUT(
req: Request,
{ params }: { params: Promise<{ id: string }> }
) {
const resolvedParams = await params;
const id = parseId(resolvedParams.id);
if (id === null) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
}

const body = (await req.json()) as {
    cliente?: string;
    servicio?: string;
    fecha?: string; // "2025-09-30T16:00:00Z"
};

const data: Record<string, unknown> = {};
if (body.cliente) data.cliente = body.cliente;
if (body.servicio) data.servicio = body.servicio;
if (body.fecha) {
    const d = new Date(body.fecha);
    if (isNaN(d.getTime())) {
    return NextResponse.json({ error: "Fecha inválida (usa ISO UTC)" }, { status: 400 });
    }
    data.fecha = d;
}

if (Object.keys(data).length === 0) {
    return NextResponse.json(
    { error: "No hay campos para actualizar" },
    { status: 400 }
    );
}

// Comprobamos que exista
const existe = await prisma.reserva.findUnique({ where: { id } });
if (!existe) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
}

const actualizada = await prisma.reserva.update({
    where: { id },
    data,
});

return NextResponse.json(actualizada, { status: 200 });
}

/* ===========================
DELETE /api/reservas/:id
Borra una reserva
=========================== */
export async function DELETE(
_req: Request,
{ params }: { params: Promise<{ id: string }> }
) {
const resolvedParams = await params;
const id = parseId(resolvedParams.id);
if (id === null) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
}

// Comprobamos que exista
const existe = await prisma.reserva.findUnique({ where: { id } });
if (!existe) {
    return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
}

await prisma.reserva.delete({ where: { id } });
return new Response(null, { status: 204 });

}
