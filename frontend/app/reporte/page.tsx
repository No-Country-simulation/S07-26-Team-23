import { getReportSections } from "@/lib/content";
import { getTaxonomy, getMethodology } from "@/lib/data";
import TaxonomyNodeCard from "@/components/TaxonomyNodeCard";
import TaxonomyReferenceCard from "@/components/TaxonomyReferenceCard";
import LayerFigure from "@/components/LayerFigure";
import DownloadableAsset from "@/components/DownloadableAsset";
import DefinitionCard from "@/components/DefinitionCard";

const LAYER_IDS = ["facility", "it", "workload"];

// Cada bloque visual del reporte (definición, tabla, capa, figura...) es un
// "Block": separado del anterior por una línea divisoria propia, como en el
// diseño. El primero de la página (el héroe) no lleva línea arriba.
function Block({
  children,
  first = false,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        first ? "" : "pt-12 border-t border-[var(--color-border-default)]"
      }`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ number, label }: { number: number; label: string }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-brand-primary)] font-semibold">
      {String(number).padStart(2, "0")} / {label}
    </span>
  );
}

// Bloques separados por línea en blanco: si todas las líneas empiezan con
// "- " se renderizan como lista, si no como párrafo.
function Prose({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => line.trim().startsWith("- "));

        if (isList) {
          return (
            <ul key={i} className="flex flex-col gap-2 list-disc pl-5">
              {lines.map((line, j) => (
                <li key={j} className="text-[var(--color-text-primary)] leading-relaxed">
                  {line.replace(/^-\s*/, "")}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-[var(--color-text-primary)] leading-relaxed">
            {block}
          </p>
        );
      })}
    </>
  );
}

export default function ReportePage() {
  const sections = getReportSections();
  const taxonomy = getTaxonomy();
  const methodology = getMethodology();

  const introduccion = sections.find((s) => s.id === "introduccion");
  const taxonomia = sections.find((s) => s.id === "taxonomia");
  const metodologia = sections.find((s) => s.id === "metodologia");
  const limitaciones = sections.find((s) => s.id === "limitaciones");
  const referencias = sections.find((s) => s.id === "referencias");

  return (
    <article className="flex flex-col pb-32">
      {/* 01 · Introducción */}
      {introduccion && (
        <header id="introduccion" className="flex flex-col gap-8 pt-12">
          <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold tracking-wider">
            PhysaFlow Investigación
          </span>
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-serif font-bold text-[var(--color-brand-primary)] leading-tight">
              {introduccion.title}
            </h1>
            {introduccion.subtitle && (
              <p className="font-serif text-xl text-[var(--color-text-secondary)] italic">
                {introduccion.subtitle}
              </p>
            )}
          </div>
          {introduccion.content ? (
            <div className="flex flex-col gap-4">
              <Prose content={introduccion.content} />
            </div>
          ) : (
            <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
          )}
          {(introduccion.author || introduccion.version || introduccion.readTime) && (
            <p className="font-mono text-xs text-[var(--color-text-secondary)] flex flex-wrap gap-x-6 gap-y-1 pt-4 border-t border-[var(--color-border-default)]">
              {introduccion.author && (
                <span>
                  Autoría: <strong className="text-[var(--color-text-primary)] font-semibold">{introduccion.author}</strong>
                </span>
              )}
              {introduccion.version && <span>Versión {introduccion.version}</span>}
              {introduccion.readTime && <span>Lectura {introduccion.readTime}</span>}
            </p>
          )}
        </header>
      )}

      {/* 02 · Taxonomía — definición */}
      {taxonomia && (
        <section id="taxonomia">
          <Block>
            <Eyebrow number={1} label="Definición" />
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
              {taxonomia.title}
            </h2>
            {taxonomia.content ? (
              <DefinitionCard
                refCode={taxonomia.refCode ?? ""}
                definition={taxonomia.content}
                includes={taxonomia.includes}
                excludes={taxonomia.excludes}
              />
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
            )}
          </Block>

          {/* 03 · Taxonomía general — comparativa de capas */}
          <Block>
            <Eyebrow number={2} label="Taxonomía general" />
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
              Tres capas, un mismo sistema.
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              La capacidad solo se convierte en trabajo útil cuando las tres capas se coordinan.
            </p>
            <div className="flex flex-col mt-2">
              {taxonomy.map((layer, i) => (
                <div
                  key={layer.id}
                  className="items-center gap-4 py-4 pl-4 border-l-[3px]"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr 1fr 1fr",
                    borderLeftColor: layer.color,
                    borderBottom: `1px solid ${layer.color}`,
                  }}
                >
                  <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {layer.name}
                  </span>
                  <span className="font-serif font-bold text-lg text-[var(--color-text-primary)]">
                    {layer.term}
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {layer.translation}
                  </span>
                </div>
              ))}
            </div>
          </Block>
        </section>
      )}

      {/* 03-05 · Capas: Instalaciones / Infraestructura TI / Cargas de trabajo */}
      {LAYER_IDS.map((layerId, i) => {
        const layer = taxonomy.find((l) => l.id === layerId);
        const section = sections.find((s) => s.id === layerId);
        const number = i + 3;
        if (!section) return null;

        if (!layer) {
          return (
            <section key={layerId} id={layerId}>
              <Block>
                <Eyebrow number={number} label={section.label} />
                <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
                  {section.label}
                </h2>
                <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
              </Block>
            </section>
          );
        }

        return (
          <section key={layerId} id={layerId}>
            <Block>
              <span
                className="font-mono text-xs uppercase tracking-wider font-semibold"
                style={{ color: layer.color }}
              >
                {String(number).padStart(2, "0")} / {layer.name}
              </span>
              <h2
                className="text-4xl font-serif font-bold"
                style={{ color: layer.color }}
              >
                {layer.term}
              </h2>
              <p className="font-serif text-lg text-[var(--color-text-secondary)] -mt-3">
                {layer.translation}
              </p>

              <TaxonomyReferenceCard layer={layer} />

              <div className="pt-4">
                <TaxonomyNodeCard layer={layer} />
              </div>

              <div className="pt-4">
                <LayerFigure layer={layer} number={number} />
              </div>
            </Block>
          </section>
        );
      })}

      {/* 06 · Metodología */}
      {metodologia && (
        <section id="metodologia">
          <Block>
            <Eyebrow number={6} label="Metodología" />
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
              {metodologia.title}
            </h2>
            {metodologia.content ? (
              <Prose content={metodologia.content} />
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
            )}
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="border-b-2 border-[var(--color-border-default)]">
                  <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Capa
                  </th>
                  <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Fuente de medición
                  </th>
                  <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Qué mide
                  </th>
                </tr>
              </thead>
              <tbody>
                {methodology.measurement.map((row) => {
                  const layerName =
                    methodology.framework.layers.find((l) => l.id === row.layer)?.name ?? row.layer;
                  return (
                    <tr key={row.layer} className="border-b border-[var(--color-border-default)] align-top">
                      <td className="py-2.5 pr-3 text-[var(--color-text-primary)] font-semibold whitespace-nowrap">
                        {layerName}
                      </td>
                      <td className="py-2.5 pr-3 text-[var(--color-text-primary)]">{row.source}</td>
                      <td className="py-2.5 text-[var(--color-text-secondary)]">{row.measures}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Block>
        </section>
      )}

      {/* 07 · Limitaciones */}
      {limitaciones && (
        <section id="limitaciones">
          <Block>
            <Eyebrow number={7} label="Limitaciones" />
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
              {limitaciones.title}
            </h2>
            {limitaciones.content ? (
              <Prose content={limitaciones.content} />
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
            )}
            <ul className="flex flex-col gap-2 list-disc pl-5 mt-2">
              {methodology.limitations.map((item) => (
                <li key={item} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Block>
        </section>
      )}

      {/* 08 · Referencias */}
      {referencias && (
        <section id="referencias">
          <Block>
            <Eyebrow number={8} label="Referencias" />
            <h2 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)] mt-1">
              {referencias.title}
            </h2>
            {referencias.content ? (
              <Prose content={referencias.content} />
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">Contenido pendiente.</p>
            )}
          </Block>
          <Block>
            <DownloadableAsset />
          </Block>
        </section>
      )}
    </article>
  );
}
