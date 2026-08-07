import LayerBadge from "./components/LayerBadge";
import CitationBlock from "./components/CitationBlock/CitationBlock";

export default function Home() {
  return (
    <article className="flex flex-col gap-12 pb-32">
      <header>
        <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold">
          PhysaFlow — Stranded Capacity Index
        </span>
        <h1 className="text-4xl font-serif font-bold text-[var(--color-brand-primary)] mt-2">
          Contenido del Reporte
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-lg">
          Definiendo el vocabulario de la industria sobre la capacidad no utilizada en data centers.
        </p>
      </header>

      <hr className="border-[var(--color-border-default)] my-2" />

      <section id="introduccion" className="flex flex-col gap-3 min-h-[250px]">
        <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)]">
          1. Introducción
        </h2>
        <p className="text-[var(--color-text-primary)] leading-relaxed">
          La industria de los data centers enfrenta una paradoja: una proporción significativa de la capacidad instalada no produce salida computacional útil.
        </p>
      </section>

      <section id="facility" className="flex flex-col gap-3 min-h-[250px]">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-layer-facility)]">
            2. Capa Facility
          </h2>
          <LayerBadge type="facility" />
        </div>
        <p className="text-[var(--color-text-primary)] leading-relaxed">
          Análisis de la infraestructura física, energía, refrigeración y limitaciones de espacio en las instalaciones.
        </p>
      </section>

      <section id="it" className="flex flex-col gap-3 min-h-[250px]">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-layer-it)]">
            3. Capa IT
          </h2>
          <LayerBadge type="it" />
        </div>
        <p className="text-[var(--color-text-primary)] leading-relaxed">
          Evaluación de servidores, switches de red, almacenamiento y tasa de utilización de hardware.
        </p>
      </section>

      <section id="workload" className="flex flex-col gap-3 min-h-[250px]">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-serif font-bold text-[var(--color-layer-workload)]">
            4. Capa Workload
          </h2>
          <LayerBadge type="workload" />
        </div>
        <p className="text-[var(--color-text-primary)] leading-relaxed">
          Monitoreo de cargas de trabajo, orquestación de máquinas virtuales y optimización de procesamiento.
        </p>
      </section>

      <section id="metodologia" className="flex flex-col gap-3 min-h-[250px]">
        <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)]">
          5. Metodología
        </h2>
        <p className="text-[var(--color-text-primary)] leading-relaxed">
          Descripción de la recolección de datos y cálculo del Stranded Capacity Index (SCI).
        </p>
      </section>

      <section id="citas" className="flex flex-col gap-3 min-h-[250px]">
        <h2 className="text-2xl font-serif font-bold text-[var(--color-brand-primary)]">
          6. Cómo citar
        </h2>
        <p className="text-[var(--color-text-primary)] font-mono text-xs bg-[var(--color-bg-subtle)] p-4 rounded border border-[var(--color-border-default)]">
          PhysaFlow (2026). Stranded Capacity Index Report.
        </p>
      </section>
    </article>
  );
}