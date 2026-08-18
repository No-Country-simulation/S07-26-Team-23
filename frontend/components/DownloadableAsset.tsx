export default function DownloadableAsset() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-3xl font-serif font-bold text-[var(--color-brand-primary)]">
          Descargar el reporte completo
        </h3>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Descarga la versión editorial completa del Índice de Capacidad Varada en PDF.
        </p>
      </div>

      <a
        href="/reporte/descarga"
        className="self-start flex items-center gap-2 px-5 py-3 rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Descargar PDF <span aria-hidden="true">↓</span>
      </a>

      <p className="text-sm text-[var(--color-text-secondary)]">Descarga directa. No requiere registro.</p>
    </div>
  );
}
