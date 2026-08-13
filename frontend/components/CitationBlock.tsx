interface CitationBlockProps {
    author: string;
    year: string | number;
    title: string;
    url: string;
}

export default function CitationBlock({
    author,
    year,
    title,
    url,
}: CitationBlockProps) {
    return (
        <div className="flex flex-col gap-6 p-6 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-card)]">
            <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">
                Cómo citar este reporte
            </h3>

            {/* Formato APA 7 */}
            <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold">
                    Formato APA 7
                </span>
                <p className="text-sm text-[var(--color-text-primary)] font-mono bg-[var(--color-bg-page)] p-3 rounded border border-[var(--color-border-default)] select-all">
                    {author} ({year}). <em>{title}</em>. PhysaFlow Stranded Capacity Index. {url}
                </p>
            </div>

            {/* Formato Periodístico */}
            <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-[var(--color-brand-accent)] uppercase font-semibold">
                    Formato Periodístico
                </span>
                <p className="text-sm text-[var(--color-text-primary)] font-mono bg-[var(--color-bg-page)] p-3 rounded border border-[var(--color-border-default)] select-all">
                    {author} ({year}), &ldquo;{title}&rdquo;, PhysaFlow Stranded Capacity Index, disponible en {url}.
                </p>
            </div>
        </div>
    );
}