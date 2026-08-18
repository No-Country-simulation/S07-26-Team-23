import Image from "next/image";

export default function ReportHeader() {
  return (
    <header className="w-full border-b border-[var(--color-border-default)] bg-[var(--color-bg-page)]">
      <div className="flex items-center justify-between gap-6 px-8 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PhysaFlow"
            width={28}
            height={28}
            className="rounded-[var(--radius-sm)] shrink-0 object-contain"
          />

          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-lg text-[var(--color-brand-primary)]">
              PhysaFlow
            </span>
            <span className="font-mono text-[11px] tracking-wider text-[var(--color-text-secondary)] uppercase">
              Investigación
            </span>
          </div>

          <span className="text-[var(--color-border-default)]">|</span>

          <span className="font-mono text-[11px] tracking-wider text-[var(--color-text-secondary)] uppercase">
            Índice de Capacidad Varada
          </span>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <a
            href="#citas"
            className="font-mono text-xs text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-accent)] transition-colors"
          >
            Cómo citar
          </a>
          <span className="font-mono text-xs text-[var(--color-text-secondary)]">
            PDF en preparación
          </span>
        </div>
      </div>
    </header>
  );
}
