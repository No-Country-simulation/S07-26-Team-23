export interface ReportSectionMeta {
  id: string;
  slug: string;
  label: string;
}

// Fuente única de verdad para las secciones del reporte: define el ancla (id),
// el archivo en content/ (slug) y el texto del TOC (label).
export const REPORT_SECTIONS: ReportSectionMeta[] = [
  { id: "introduccion", slug: "introduccion", label: "Introducción" },
  { id: "taxonomia", slug: "taxonomia", label: "Taxonomía" },
  { id: "facility", slug: "facility-idle-megawatts", label: "Instalaciones — Idle Megawatts" },
  { id: "it", slug: "it-dark-silicon", label: "Infraestructura TI — Dark Silicon" },
  { id: "workload", slug: "workload-ghost-work", label: "Cargas de trabajo — Ghost Work" },
  { id: "metodologia", slug: "metodologia", label: "Metodología" },
  { id: "limitaciones", slug: "limitaciones", label: "Limitaciones" },
  { id: "citas", slug: "citas", label: "Cómo citar este reporte" },
  { id: "referencias", slug: "referencias", label: "Referencias" },
];
