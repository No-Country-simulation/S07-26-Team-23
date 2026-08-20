import type { TaxonomyLayer } from "@/lib/types";

interface LayerFigureProps {
  layer: TaxonomyLayer;
  number: number;
}

export default function LayerFigure({ layer, number }: LayerFigureProps) {
  const { title, percentage } = layer.illustrativeFigure;
  const usable = 100 - percentage;
  const figureId = String(number).padStart(2, "0");

  return (
    <div className="flex flex-col gap-5 border border-[var(--color-border-default)] bg-[var(--color-bg-card)] p-6">
      <div className="flex flex-col gap-1">
        <span
          className="font-mono text-xs uppercase tracking-wider font-semibold"
          style={{ color: layer.color }}
        >
          Figura {figureId} / Dato ilustrativo
        </span>
        <h3 className="font-serif text-xl font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div
          className="relative h-36 w-36 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(${layer.color} 0 ${usable}%, var(--color-brand-accent) ${usable}% 100%)`,
          }}
        >
          <div className="absolute inset-[14px] flex flex-col items-center justify-center gap-1 rounded-full bg-[var(--color-bg-card)] text-center">
            <span className="font-serif text-3xl font-bold text-[var(--color-brand-accent)]">
              {percentage}%
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-text-secondary)]">
              Capacidad no utilizable
            </span>
          </div>
        </div>

        <div className="flex min-w-[220px] flex-1 flex-col">
          <div
            className="flex flex-col gap-1.5 border-t-2 py-3"
            style={{ borderTopColor: layer.color }}
          >
            <span className="font-semibold" style={{ color: layer.color }}>
              Trabajo útil · {usable} %
            </span>
            <p className="text-sm text-[var(--color-text-primary)]">
              Capacidad que entrega un resultado verificable.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 border-t-2 border-[var(--color-brand-accent)] py-3">
            <span className="font-semibold text-[var(--color-brand-accent)]">
              Capacidad no utilizable · {percentage} %
            </span>
            <p className="text-sm text-[var(--color-text-primary)]">
              Proporción ilustrativa asociada a {layer.term}.
            </p>
          </div>
          <p className="border-t border-[var(--color-border-default)] pt-3 text-sm text-[var(--color-text-secondary)]">
            La distribución suma 100 % y explica el marco; no representa telemetría en tiempo real.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border-default)] pt-4">
        <div className="flex flex-wrap items-center gap-5 text-xs">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
              style={{ backgroundColor: layer.color }}
            />
            Trabajo útil: {usable} %
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[var(--color-brand-accent)]" />
            Capacidad no utilizable: {percentage} %
          </span>
        </div>
        <span className="text-xs italic text-[var(--color-text-secondary)]">
          La información se explica también en texto.
        </span>
      </div>

      <p className="font-mono text-[10px] text-[var(--color-text-secondary)]">
        Fuente: PhysaFlow · Índice de Capacidad Varada ·{" "}
        <span className="text-[var(--color-brand-accent)]">
          Datos ilustrativos del proyecto. Reemplazar con información validada.
        </span>
      </p>
    </div>
  );
}
