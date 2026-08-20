import type { TaxonomyLayer } from "../lib/types";

interface TaxonomyNodeCardProps {
  layer: TaxonomyLayer;
}

export default function TaxonomyNodeCard({ layer }: TaxonomyNodeCardProps) {
  return (
    <div className="flex flex-col gap-5 pl-5">
      <div
        className="flex flex-col gap-2 -ml-5 pl-5 border-l-[3px]"
        style={{ borderLeftColor: layer.color }}
      >
        <span
          className="font-mono text-sm uppercase tracking-wider font-semibold"
          style={{ color: layer.color }}
        >
          Definición
        </span>
        <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
          {layer.observed}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border-default)]">
        <div className="flex flex-col gap-1">
          <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)]">Qué se ve</p>
          <p className="text-base text-[var(--color-text-secondary)]">{layer.whatYouSee}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)]">Por qué ocurre</p>
          <p className="text-base text-[var(--color-text-secondary)]">{layer.whyItHappens}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border-default)]">
        <div className="flex flex-col gap-1">
          <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)]">Indicadores clave</p>
          <p className="text-base text-[var(--color-text-secondary)]">{layer.keyIndicators}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-serif font-semibold text-lg text-[var(--color-text-primary)]">Relación entre capas</p>
          <p className="text-base text-[var(--color-text-secondary)]">{layer.layerRelation}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-4 border-t-2" style={{ borderTopColor: layer.color }}>
        <span
          className="font-mono text-sm uppercase tracking-wider font-semibold"
          style={{ color: layer.color }}
        >
          Impacto estimado
        </span>
        <div className="flex flex-wrap items-center justify-between gap-16">
          <span className="text-3xl font-serif font-bold" style={{ color: layer.color }}>
            {layer.cost.headline}
          </span>
          <span className="text-sm text-[var(--color-text-secondary)] max-w-[220px]">{layer.cost.unit}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8 border-t-2" style={{ borderTopColor: layer.color }}>
        <span className="text-xs text-[var(--color-text-secondary)]">{layer.metricsCaption}</span>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-default)]">
              <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                Métrica
              </th>
              <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                Valor típico
              </th>
              <th className="text-left py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                Valor eficiente
              </th>
            </tr>
          </thead>
          <tbody>
            {layer.metrics.map((metric) => (
              <tr key={metric.label} className="border-b border-[var(--color-border-default)]">
                <td className="py-2 pr-3 font-semibold text-[var(--color-text-primary)]">{metric.label}</td>
                <td className="py-2 pr-3 text-[var(--color-text-secondary)]">{metric.typical}</td>
                <td className="py-2 font-mono" style={{ color: layer.color }}>
                  {metric.efficient}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
