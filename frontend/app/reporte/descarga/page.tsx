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
          El PDF unificado con las tres capas está en preparación. Mientras tanto, podés descargar el
          reporte de cada capa por separado.
        </p>
      </header>

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
    </article>
  );
}
