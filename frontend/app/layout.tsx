import type { Metadata } from "next";
import TableOfContents from "@/components/TableOfContents";
import ReportHeader from "@/components/ReportHeader";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://physaflow.com"),
  title: "PhysaFlow – Stranded Capacity Index",
  description: "Reporte de referencia de la industria sobre la capacidad varada en data centers.",
  openGraph: {
    title: "PhysaFlow – Stranded Capacity Index",
    description: "Reporte de referencia de la industria sobre la capacidad varada en data centers.",
    url: "https://physaflow.com",
    siteName: "PhysaFlow Stranded Capacity Index",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhysaFlow – Stranded Capacity Index",
    description: "Reporte de referencia de la industria sobre la capacidad varada en data centers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: 'PhysaFlow Stranded Capacity Index',
    description: 'Reporte de referencia de la industria sobre la capacidad varada en data centers.',
    author: {
      '@type': 'Organization',
      name: 'PhysaFlow',
    },
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ReportHeader />

        <div className="flex flex-1">
          {/* Aquí ponemos nuestro menú lateral dinámico */}
          <TableOfContents />

          {/* Aquí es donde se dibuja el contenido central (page.tsx) */}
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-[850px] px-6 md:px-24">
              {children}
            </div>
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}