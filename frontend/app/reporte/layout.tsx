import type { Metadata } from "next";

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
    <div className="flex flex-col flex-1 bg-[var(--color-bg-page)] text-[var(--color-text-primary)]">
      {children}
    </div>
  );
}