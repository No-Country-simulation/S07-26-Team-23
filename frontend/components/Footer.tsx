export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border-default)]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6">
        <span className="font-mono text-xs text-[var(--color-text-secondary)] tracking-wider">
          PhysaFlow · Investigación · Índice de Capacidad Varada
        </span>
        <nav className="flex flex-wrap items-center gap-6">
          <a
            href="#"
            className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Declaración de accesibilidad
          </a>
          <a
            href="#"
            className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Aviso legal
          </a>
          <a
            href="/reporte#citas"
            className="font-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors"
          >
            Cómo citar
          </a>
        </nav>
      </div>
    </footer>
  );
}
