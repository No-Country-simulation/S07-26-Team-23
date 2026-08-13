import LayerBadge from "@/components/LayerBadge";
import { getReportSections } from "@/lib/content";
import TableOfContents from "@/components/TableOfContents";

const LAYER_BY_SECTION: Record<string, "facility" | "it" | "workload"> = {
  facility: "facility",
  it: "it",
  workload: "workload",
};

// Clases completas y estáticas: Tailwind no genera CSS para nombres armados
// dinámicamente con template literals.
const LAYER_HEADING_CLASS: Record<"facility" | "it" | "workload", string> = {
  facility: "text-[var(--color-layer-facility)]",
  it: "text-[var(--color-layer-it)]",
  workload: "text-[var(--color-layer-workload)]",
};

export default function ReportePage() {
  const sections = getReportSections();

  return (
    <article className="flex flex-col gap-12 pb-32">
      <TableOfContents />
      <header>
        <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold">
          PhysaFlow — Stranded Capacity Index
        </span>
        <h1 className="text-4xl font-serif font-bold text-[var(--color-brand-primary)] mt-2">
          Contenido del Reporte
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-lg">
          Definiendo el vocabulario de la industria sobre la capacidad no
          utilizada en data centers.
        </p>
      </header>

      <hr className="border-[var(--color-border-default)] my-2" />

      {sections.map((section) => {
        const layer = LAYER_BY_SECTION[section.id];
        return (
          <section
            key={section.id}
            id={section.id}
            className="flex flex-col gap-3 min-h-[250px]"
          >
            <div className="flex items-center gap-3">
              <h2
                className={`text-2xl font-serif font-bold ${
                  layer ? LAYER_HEADING_CLASS[layer] : "text-[var(--color-brand-primary)]"
                }`}
              >
                {section.title}
              </h2>
              {layer && <LayerBadge type={layer} />}
            </div>
            {section.content ? (
              <p className="text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">
                Contenido pendiente.
              </p>
            )}
          </section>
        );
      })}
    </article>
  );
}
