"use client";

import { useEffect, useState } from "react";
import { REPORT_SECTIONS } from "@/lib/report-sections";

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(REPORT_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    REPORT_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="w-[252px] shrink-0 h-screen sticky top-0 border-r border-[var(--color-border-default)] hidden md:block"
      style={{
        paddingTop: "52px",
        paddingLeft: "32px",
        paddingRight: "24px",
      }}
    >
      <nav className="flex flex-col gap-4 text-sm font-sans">
        <span className="font-serif font-bold text-lg text-[var(--color-brand-primary)]">
          PhysaFlow
        </span>
        <hr className="border-[var(--color-border-default)] mb-2" />
        <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
          Tabla de Contenidos
        </p>
        <ul className="flex flex-col gap-2.5">
          {REPORT_SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`text-xs transition-colors duration-200 block ${
                    isActive
                      ? "text-[var(--color-brand-primary)] font-semibold translate-x-1"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)]"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
