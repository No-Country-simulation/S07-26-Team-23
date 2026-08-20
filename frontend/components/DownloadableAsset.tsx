interface DownloadableAssetProps {
    title?: string;
    description?: string;
    href?: string;
}

const ATTRIBUTION = "Source: PhysaFlow Stranded Capacity Index";
const DEFAULT_HREF = "/reporte/descarga";

export default function DownloadableAsset({
    title = "Descargar el reporte completo",
    description = "Descarga la version editorial completa del Indice de Capacidad Varada en PDF.",
    href = DEFAULT_HREF,
}: DownloadableAssetProps) {
    return (
        <div className="group flex flex-col gap-5 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-brand-primary)] hover:shadow-[0_14px_34px_rgba(27,77,62,0.10)]">
            <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-semibold uppercase text-[var(--color-brand-accent)]">
                    PDF descargable
                </span>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text-primary)]">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {description}
                </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-[var(--color-border-default)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs font-medium uppercase text-[var(--color-text-secondary)]">
                        PDF
                    </span>
                    <span className="font-mono text-[11px] text-[var(--color-text-secondary)]">
                        {ATTRIBUTION}
                    </span>
                </div>

                <a
                    href={href}
                    className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] px-4 font-mono text-xs font-semibold uppercase text-white transition-colors duration-200 hover:bg-[#153D32] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent)] focus:ring-offset-2"
                >
                    Descargar PDF
                </a>
            </div>
        </div>
    );
}
