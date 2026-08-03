import type { Metadata } from "next";
import TableOfContents from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "Reporte — PhysaFlow",
  description:
    "Reporte de referencia de la industria sobre la capacidad varada en data centers.",
};

export default function ReporteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex flex-1 bg-[var(--color-bg-page)] text-[var(--color-text-primary)]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <TableOfContents />
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
    </div>
  );
}
