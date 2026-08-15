export interface TaxonomyNode {
  id: string;
  layer: 'facility' | 'it' | 'workload';
  title: string;
  subtitle: string;
  description: string;
  metrics?: {
    label: string;
    value: string;
  };
}

export const TAXONOMY_DATA: TaxonomyNode[] = [
  {
    id: 'idle-megawatts',
    layer: 'facility',
    title: 'Idle Megawatts',
    subtitle: 'Capacidad eléctrica e infraestructura no utilizada',
    description: 'Energía provisionada en el Data Center que no genera trabajo computacional activo.',
    metrics: { label: 'Inactividad promedio', value: '25-35%' },
  },
  {
    id: 'dark-silicon',
    layer: 'it',
    title: 'Dark Silicon',
    subtitle: 'Hardware / Servidores infrautilizados',
    description: 'Procesadores y memoria física encendidos pero con baja tasa de ocupación de hilos.',
    metrics: { label: 'Capacidad ociosa', value: '40%' },
  },
  {
    id: 'ghost-work',
    layer: 'workload',
    title: 'Ghost Work',
    subtitle: 'Procesos y tareas sin impacto real',
    description: 'Cargas de trabajo ejecutadas sin retorno de valor directo para el negocio o modelo.',
    metrics: { label: 'Carga fantasma', value: '15-20%' },
  },
];