# Mi Primera Next.js App

Una aplicación completa de Next.js 15 con Prisma, PostgreSQL y TypeScript.

## Características

- ⚡ Next.js 15 con App Router
- 🗄️ Base de datos PostgreSQL con Prisma ORM
- 💅 Tailwind CSS para estilos
- 🔒 TypeScript para type safety
- 📝 CRUD completo para reservas
- 🎨 Componentes reutilizables
- 📱 Diseño responsive

## Requisitos Previos

- Node.js 18+ 
- PostgreSQL database (local o cloud)
- npm, yarn o pnpm

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd mi-primera-next
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` con tu información de base de datos:
```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

4. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate deploy
npx prisma generate
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:studio` - Abrir Prisma Studio

## Estructura del Proyecto

```
├── src/
│   ├── app/              # App Router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Dashboard pages
│   │   └── components/   # Componentes React
├── lib/                  # Utilidades y configuración
├── prisma/              # Esquema y migraciones de DB
├── public/              # Archivos estáticos
└── ...
```

## Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura la variable de entorno `DATABASE_URL`
3. Deploy automático en cada push

### Otros Proveedores

1. Build del proyecto:
```bash
npm run build
```

2. Configura las variables de entorno
3. Ejecuta migraciones en producción:
```bash
npm run db:migrate
```

## API Endpoints

- `GET /api/reservas` - Listar reservas
- `POST /api/reservas` - Crear reserva
- `GET /api/reservas/[id]` - Obtener reserva
- `PUT /api/reservas/[id]` - Actualizar reserva
- `DELETE /api/reservas/[id]` - Eliminar reserva

## Tecnologías

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [PostgreSQL](https://postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://typescriptlang.org/)
