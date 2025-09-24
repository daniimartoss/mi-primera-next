// lib/prisma.ts
import { PrismaClient } from "../src/generated/prisma"; //mal path

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
globalForPrisma.prisma ||
new PrismaClient({
    log: ["query", "error", "warn"], // opcional, útil en dev
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
