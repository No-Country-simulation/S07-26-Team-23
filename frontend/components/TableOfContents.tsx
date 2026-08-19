"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { REPORT_SECTIONS } from "@/lib/report-sections";

interface TocItem {
  id: string;
  label: string;
  href: string;
  type: "section" | "page";
}

const tocItems: TocItem[] = [
  ...REPORT_SECTIONS.filter((section) => section.id !== "citas").map((section) => ({
    id: section.id,
    label: section.label,
    href: `/reporte#${section.id}`,
    type: "section" as const,
  })),
  { id: "pdf", label: "PDF", href: "/reporte/pdf", type: "page" },
  { id: "como-citar", label: "Cómo citar", href: "/reporte/como-citar", type: "page" },
];

export default function TableOfContents() {
  const pathname = usePathname();
  const [observedActiveId, setObservedActiveId] = useState<string>(REPORT_SECTIONS[0].id);
  const routeActiveId =
    pathname === "/reporte/pdf"
      ? "pdf"
      : pathname === "/reporte/como-citar"
        ? "como-citar"
        : undefined;
  const activeId = routeActiveId || observedActiveId;

  useEffect(() => {
    if (routeActiveId) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setObservedActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    tocItems.filter((section) => section.type === "section").forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [routeActiveId]);

  return (
    <aside
      className="w-[320px] shrink-0 h-screen sticky top-0 border-r border-[var(--color-border-default)] hidden md:block"
      style={{
        paddingTop: "52px",
        paddingLeft: "32px",
        paddingRight: "24px",
      }}
    >
      <nav className="flex flex-col gap-4 text-sm">
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
          Contenido
        </p>
        <ul className="flex flex-col gap-3">
          {tocItems.map((section, index) => {
            const isActive = activeId === section.id;
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={section.id}>
                <a
                  href={section.href}
                  className={`flex items-baseline gap-2.5 pl-2.5 border-l-2 transition-colors duration-200 ${
                    isActive
                      ? "border-[var(--color-brand-primary)]"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] shrink-0 ${
                      isActive
                        ? "text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {number}
                  </span>
                  <span
                    className={`text-xs leading-snug ${
                      isActive
                        ? "text-[var(--color-text-primary)] font-semibold"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]"
                    }`}
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
