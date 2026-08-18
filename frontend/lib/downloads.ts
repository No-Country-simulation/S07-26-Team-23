export interface LayerDownload {
    id: string;
    name: string;
    href: string;
}

export const LAYER_DOWNLOADS: LayerDownload[] = [
    { id: "facility", name: "Instalaciones — Idle Megawatts", href: "/downloads/physaflow-report-facility.pdf" },
    { id: "it", name: "Infraestructura TI — Dark Silicon", href: "/downloads/physaflow-report-it.pdf" },
    { id: "workload", name: "Cargas de trabajo — Ghost Work", href: "/downloads/physaflow-report-workload.pdf" },
];
