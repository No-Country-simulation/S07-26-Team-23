type LayerType = "facility" | "it" | "workload";

interface LayerBadgeProps {
  type: LayerType;
  label?: string;
}

const layerConfig: Record<LayerType, { name: string; className: string }> = {
  facility: {
    name: "Capa Facility",
    className: "bg-[#EBF5EE] text-[var(--color-layer-facility)] border-[#C2E3CC]",
  },
  it: {
    name: "Capa IT",
    className: "bg-[#EBF3F5] text-[var(--color-layer-it)] border-[#C2DCDE]",
  },
  workload: {
    name: "Capa Workload",
    className: "bg-[#F5F2EB] text-[var(--color-layer-workload)] border-[#E6DCCB]",
  },
};

export default function LayerBadge({ type, label }: LayerBadgeProps) {
  const config = layerConfig[type];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border ${config.className}`}
    >
      {label || config.name}
    </span>
  );
}