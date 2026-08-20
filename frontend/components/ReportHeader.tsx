"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const HOME_HREF = "/reporte";

export default function ReportHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === HOME_HREF;

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      event.preventDefault();
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-[var(--color-border-default)] bg-[var(--color-bg-page)]">
      <div className="flex items-center justify-between gap-6 px-8 h-full">
        <div className="flex items-center gap-3">
          <a href={HOME_HREF} onClick={handleHomeClick} className="flex items-baseline gap-2">
            <Image
              src="/logo.png"
              alt="PhysaFlow"
              width={28}
              height={28}
              className="rounded-[var(--radius-sm)] shrink-0 object-contain self-center"
            />
            <span className="font-serif font-bold text-lg text-[var(--color-brand-primary)]">
              PhysaFlow
            </span>
            <span className="font-mono text-[11px] tracking-wider text-[var(--color-text-secondary)] uppercase">
              Investigación
            </span>
          </a>

          <span className="text-[var(--color-border-default)]">|</span>

          <span className="font-mono text-[11px] tracking-wider text-[var(--color-text-secondary)] uppercase">
            Índice de Capacidad Varada
          </span>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <a
            href="/reporte/como-citar"
            className="font-mono text-xs text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-accent)] transition-colors"
          >
            Cómo citar
          </a>
          <a
            href="/reporte/descarga"
            className="font-mono text-xs text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-accent)] transition-colors"
          >
            Descargar Reporte PDF
          </a>
        </div>
      </div>
    </header>
  );
}
