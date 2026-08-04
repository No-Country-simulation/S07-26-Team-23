import type { Metadata } from "next";
import TableOfContents from "./components/TableOfContents";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysaFlow — Stranded Capacity Index",
  description: "Reporte de referencia de la industria sobre la capacidad varada en data centers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex antialiased">
        {/* Aquí ponemos nuestro menú lateral dinámico */}
        <TableOfContents />

        {/* Aquí es donde se dibuja el contenido central (page.tsx) */}
        <main className="flex-1 flex justify-center">
          <div
            className="w-full max-w-[700px]"
            style={{
              paddingTop: "56px",
              paddingLeft: "96px",
              paddingRight: "96px",
            }}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}