"use client";

import { useState } from "react";

interface DownloadableAssetProps {
  title?: string;
  description?: string;
  fileUrl?: string;
  fileSize?: string;
}

const ATTRIBUTION = "Source: PhysaFlow Stranded Capacity Index";
const DEFAULT_FILE_URL = "/downloads/physaflow-report-facility.pdf";

export default function DownloadableAsset({
  title = "Descargar el reporte completo",
  description = "Obtén la documentación técnica y el análisis detallado de la capacidad varada en PDF.",
  fileUrl = DEFAULT_FILE_URL,
  fileSize = "2.4 MB",
}: DownloadableAssetProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recurso Descargable
          </span>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs italic text-muted-foreground/80 pt-1">{ATTRIBUTION}</p>
        </div>

        <a
          href={fileUrl}
          download
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 shrink-0"
        >
          {isDownloading ? (
            <span>Descargando...</span>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>PDF ({fileSize})</span>
            </>
          )}
        </a>
      </div>
    </div>
  );
}