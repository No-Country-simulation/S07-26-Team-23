"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

const sections: TocItem[] = [
  { id: "introduccion", label: "1. Introducción" },
  { id: "facility", label: "2. Capa Facility" },
  { id: "it", label: "3. Capa IT" },
  { id: "workload", label: "4. Capa Workload" },
  { id: "metodologia", label: "5. Metodología" },
  { id: "citas", label: "6. Cómo citar" },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("introduccion");

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

    sections.forEach((section) => {
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
          {sections.map((section) => {
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