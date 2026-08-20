import type { Metadata } from "next";
import { LAYER_DOWNLOADS } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Descargar reporte — PhysaFlow",
  description: "Descargá el reporte del Índice de Capacidad Varada en PDF.",
};

export default function DescargaPage() {
  return (
    <article className="flex flex-col gap-8 pt-12 pb-32">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold tracking-wider">
          PhysaFlow Investigación
        </span>
        <h1 className="text-4xl font-serif font-bold text-[var(--color-brand-primary)] leading-tight">
          Descargar el reporte
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Descargá el reporte completo en PDF o, si preferís, el reporte de cada capa por separado.
        </p>
      </header>

      <div className="flex flex-col gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] p-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase text-[var(--color-brand-accent)]">
            PDF completo
          </span>
          <h2 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">
            Descarga de PDF completo
          </h2>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Incluye el reporte entero: introducción, definición, taxonomía, las tres capas con sus
            gráficos ilustrativos, metodología, limitaciones y referencias.
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--color-border-default)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">
            Source: PhysaFlow Stranded Capacity Index
          </span>
          <a
            href="/downloads/physaflow-report-completo.pdf"
            download
            className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] px-4 font-mono text-xs font-semibold uppercase text-white transition-colors duration-200 hover:bg-[#153D32] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-offset-2"
          >
            Descargar PDF completo
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
          Por capa
        </span>
        <ul className="flex flex-col gap-4">
          {LAYER_DOWNLOADS.map((item) => (
            <li key={item.id} className="pt-4 border-t border-[var(--color-border-default)]">
              <a
                href={item.href}
                download
                className="font-semibold text-[var(--color-brand-primary)] underline underline-offset-4 hover:text-[var(--color-brand-accent)] transition-colors"
              >
                Descargar PDF — {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
