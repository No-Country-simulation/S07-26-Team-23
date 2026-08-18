"use client";

import { useState } from "react";

interface DefinitionCardProps {
  refCode: string;
  definition: string;
  includes?: string;
  excludes?: string;
}

export default function DefinitionCard({
  refCode,
  definition,
  includes,
  excludes,
}: DefinitionCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(definition);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-l-[3px] border-[var(--color-brand-primary)] pl-5 flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
          {refCode}
        </span>
        <p className="text-[var(--color-text-primary)] leading-relaxed">{definition}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="self-start font-semibold text-sm text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-accent)] transition-colors"
        >
          {copied ? "Copiado" : "Copiar definición"}
        </button>
      </div>
      {(includes || excludes) && (
        <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
          {includes && (
            <>
              <strong className="font-semibold">Incluye:</strong> {includes}{" "}
            </>
          )}
          {excludes && (
            <>
              <strong className="font-semibold">No incluye:</strong> {excludes}
            </>
          )}
        </p>
      )}
    </div>
  );
}
