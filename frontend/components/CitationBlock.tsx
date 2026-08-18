"use client";

import { useState } from "react";

interface CitationBlockProps {
    academic: string;
    journalistic: string;
}

const ATTRIBUTION_TEXT = "Source: PhysaFlow Stranded Capacity Index";

export default function CitationBlock({ academic, journalistic }: CitationBlockProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = async (key: string, text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied((current) => (current === key ? null : current)), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 pt-6 border-t border-[var(--color-border-default)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Formato académico · APA 7
                </span>
                <p className="font-serif text-lg text-[var(--color-text-primary)] leading-relaxed">
                    {academic}
                </p>
                <button
                    type="button"
                    onClick={() => handleCopy("apa", academic)}
                    className="self-start font-semibold text-sm text-[var(--color-brand-primary)] underline underline-offset-4 hover:text-[var(--color-brand-accent)] transition-colors"
                >
                    {copied === "apa" ? "Copiado" : "Copiar cita APA 7"}
                </button>
            </div>

            <div className="flex flex-col gap-2 pt-6 border-t border-[var(--color-border-default)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Formato periodístico
                </span>
                <p className="font-serif text-lg text-[var(--color-text-primary)] leading-relaxed">
                    {journalistic}
                </p>
                <button
                    type="button"
                    onClick={() => handleCopy("journalistic", journalistic)}
                    className="self-start font-semibold text-sm text-[var(--color-brand-primary)] underline underline-offset-4 hover:text-[var(--color-brand-accent)] transition-colors"
                >
                    {copied === "journalistic" ? "Copiado" : "Copiar cita periodística"}
                </button>

                <div className="flex flex-col gap-1 pl-4 mt-2 border-l-2 border-[var(--color-brand-accent)]">
                    <p className="font-semibold text-[var(--color-text-primary)]">Nota de validación</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        Los formatos de cita son provisionales y requieren validación final del equipo.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-6 border-t border-[var(--color-border-default)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Atribución de gráficos
                </span>
                <p className="font-serif text-lg text-[var(--color-text-primary)]">{ATTRIBUTION_TEXT}</p>
                <button
                    type="button"
                    onClick={() => handleCopy("attribution", ATTRIBUTION_TEXT)}
                    className="self-start font-semibold text-sm text-[var(--color-brand-primary)] underline underline-offset-4 hover:text-[var(--color-brand-accent)] transition-colors"
                >
                    {copied === "attribution" ? "Copiado" : "Copiar atribución"}
                </button>
            </div>
        </div>
    );
}
