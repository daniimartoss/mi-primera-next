// app/layout.tsx
import Link from "next/link";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-black">
        <header className="p-4 bg-blue-600 text-white flex gap-4 items-center justify-center">
            <Link href="/" className="hover:scale-105 transition-scale duration-100 ">DashBoard</Link>
          <Link href="/about" className="hover:scale-105 transition-scale duration-100">About</Link>
        </header>


        <div className="flex">
          <nav className="bg-slate-800 w-48 p-4 shadow-md mr-4 text">
            <h2 className="text-2xl font-bold">Sidebar</h2>
            <div className="flex flex-col">
              <a href="" className="hover:text-blue-600">· About</a>
              <a href="" className="hover:text-blue-600">· Post</a>
              <a href="" className="hover:text-blue-600">· Products</a>
            </div>
          </nav>
          <main className="p-6">{children}</main>
        </div>

        <footer className="p-4 bg-gray-800 text-white text-center">
          © {new Date().getFullYear()} Mi primera app Next.js
        </footer>
      </body>
    </html>
  );
}
