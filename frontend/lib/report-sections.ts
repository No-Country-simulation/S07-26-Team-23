export interface ReportSectionMeta {
  id: string;
  slug: string;
  label: string;
}

// Fuente única de verdad para las secciones del reporte: define el ancla (id),
// el archivo en content/ (slug) y el texto del TOC (label).
export const REPORT_SECTIONS: ReportSectionMeta[] = [
  { id: "introduccion", slug: "introduccion", label: "1. Introducción" },
  { id: "facility", slug: "facility-idle-megawatts", label: "2. Capa Facility" },
  { id: "it", slug: "it-dark-silicon", label: "3. Capa IT" },
  { id: "workload", slug: "workload-ghost-work", label: "4. Capa Workload" },
  { id: "metodologia", slug: "metodologia", label: "5. Metodología" },
  { id: "citas", slug: "citas", label: "6. Cómo citar" },
];
