"use client";

import { useState } from "react";
import type { TaxonomyLayer } from "@/lib/types";

interface TaxonomyReferenceCardProps {
  layer: TaxonomyLayer;
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
        {label}
      </span>
      <span className="text-xs text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}

export default function TaxonomyReferenceCard({ layer }: TaxonomyReferenceCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}${layer.permalink}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 pt-3 border-t-2" style={{ borderTopColor: layer.color }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]">
            {layer.tag}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs font-semibold" style={{ color: layer.color }}>
              {layer.code}
            </span>
            <span className="font-serif font-bold text-3xl text-[var(--color-text-primary)]">
              {layer.term}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-accent)] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3.5 10.5H2.5C2 10.5 1.5 10 1.5 9.5V2.5C1.5 2 2 1.5 2.5 1.5H9.5C10 1.5 10.5 2 10.5 2.5V3.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {copied ? "Copiado" : "Copiar enlace"}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border-default)] font-mono text-xs text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] transition-colors"
          >
            {expanded ? "Ocultar detalles" : "Mostrar detalles"} {expanded ? "−" : "+"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Definición operativa
            </span>
            <p className="text-[var(--color-text-primary)] leading-relaxed">{layer.observed}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Señales del operador
              </span>
              <p className="text-sm text-[var(--color-text-secondary)]">{layer.signalsIntro}</p>
              <ul className="flex flex-col gap-2.5 mt-1">
                {layer.signals.map((signal) => (
                  <li key={signal} className="text-sm text-[var(--color-text-primary)]">
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Impacto operativo
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Infraestructura</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{layer.operationalImpact.infrastructure}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Económico</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{layer.operationalImpact.economic}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Causas raíz
              </span>
              <ul className="flex flex-col gap-1.5 mt-1">
                {layer.rootCauses.map((cause) => (
                  <li key={cause} className="text-sm text-[var(--color-text-primary)] flex gap-2">
                    <span className="text-[var(--color-text-secondary)]">—</span>
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Términos relacionados
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                {layer.relatedTerms.map((term) => (
                  <span key={term} className="text-sm text-[var(--color-text-primary)]">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetaField label="Versión" value={layer.version} />
              <MetaField label="Permalink" value={layer.permalink} />
              <MetaField label="Última revisión" value={layer.lastReview} />
              <MetaField label="Fuente" value={layer.sourceLabel} />
            </div>
            <p className="font-mono text-[10px] text-[var(--color-text-secondary)] italic">
              Source: PhysaFlow Stranded Capacity Index
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
