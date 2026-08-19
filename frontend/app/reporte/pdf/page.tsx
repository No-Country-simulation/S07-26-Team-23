import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF y atribución — PhysaFlow",
  description:
    "Sistema de atribución visual para figuras descargables del PhysaFlow Stranded Capacity Index.",
};

const SOURCE = "PhysaFlow Stranded Capacity Index";

const anatomyItems = [
  {
    number: "01",
    title: "Source label",
    description: "Identifies the editorial provenance.",
  },
  {
    number: "02",
    title: "Report name",
    description: "The stable, reusable source reference.",
  },
  {
    number: "03",
    title: "Figure identifier",
    description: "Optional metadata for export context.",
  },
  {
    number: "04",
    title: "Divider / alignment",
    description: "Keeps source and metadata in one reading line.",
  },
  {
    number: "05",
    title: "Safe area",
    description: "A protected margin keeps attribution clear of data.",
  },
];

function SourceLine({ figure }: { figure: string }) {
  return (
    <div className="flex items-start gap-2 font-mono text-[10px] leading-tight text-[#20201D]">
      <span>Source:</span>
      <span className="max-w-[190px] font-bold text-[#155C4B]">{SOURCE}</span>
      <span className="text-[#A98E2E]">|</span>
      <span>FIGURE</span>
      <span>{figure}</span>
    </div>
  );
}

function CapacityRing() {
  return (
    <div className="relative h-36 w-36 rounded-full bg-[conic-gradient(#155C4B_0_62%,#8E8D86_62%_100%)]">
      <div className="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-[#FAFAF8]">
        <span className="font-serif text-4xl font-bold text-[#155C4B]">62%</span>
        <span className="font-mono text-[9px] font-bold uppercase text-[#20201D]">
          Utilized
        </span>
      </div>
    </div>
  );
}

function BarComparison() {
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-5 font-mono text-[10px] text-[#20201D]">
      {[
        ["Provisioned", "w-full bg-[#155C4B]"],
        ["Productive", "w-[68%] bg-[#C4A646]"],
        ["Stranded", "w-[42%] bg-[#A3A29B]"],
      ].map(([label, className]) => (
        <div key={label} className="grid grid-cols-[82px_1fr] items-center gap-5">
          <span>{label}</span>
          <span className={`block h-3 ${className}`} />
        </div>
      ))}
    </div>
  );
}

function TaxonomySketch() {
  return (
    <div className="flex w-full max-w-[330px] flex-col items-center gap-7 font-mono text-[9px] font-bold text-[#155C4B]">
      <div className="border border-[#155C4B] px-5 py-2">Capacity</div>
      <div className="grid w-full grid-cols-3 gap-2">
        {["Power", "Compute", "Workload"].map((label) => (
          <div key={label} className="border border-[#155C4B] py-2 text-center">
            {label}
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-3 gap-2 px-10 text-center text-[#C4A646]">
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>
  );
}

function ApplicationCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border border-[#D6D2C8] bg-[#FAFAF8] p-5">
      <header className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[10px] font-bold text-[#C4A646]">
          {number}
        </span>
        <h3 className="font-sans text-sm font-bold text-[#20201D]">{title}</h3>
      </header>

      <div className="flex h-44 items-center justify-center border border-[#D6D2C8] bg-[#F6F4EE]">
        {children}
      </div>

      <div className="mt-4 px-8">
        <SourceLine figure={number === "03" ? "01" : number === "04" ? "02" : "03"} />
      </div>
    </article>
  );
}

export default function PdfAttributionPage() {
  return (
    <article className="relative left-1/2 min-h-screen w-[min(1120px,calc(100vw-2rem))] -translate-x-[42%] bg-[#FAFAF8] py-14 text-[#20201D]">
      <header className="mb-16 max-w-[600px]">
        <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#155C4B]">
          02 — Downloadable visualization attribution
        </p>
        <h1 className="font-serif text-5xl leading-[0.98] tracking-normal text-[#20201D] md:text-6xl">
          A source that travels with the figure.
        </h1>
        <p className="mt-6 max-w-[560px] font-sans text-base leading-relaxed text-[#55554F]">
          Reusable source attribution system for downloadable figures from the
          PhysaFlow Stranded Capacity Index.
        </p>
      </header>

      <hr className="mb-16 border-[#D6D2C8]" />

      <section className="mb-16 max-w-[700px]">
        <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#155C4B]">
          01 — Attribution component
        </p>
        <h2 className="mb-8 font-serif text-2xl leading-tight text-[#20201D]">
          Editorial attribution, attached below the visual.
        </h2>

        <div className="border border-[#D6D2C8] bg-[#FAFAF8] p-6">
          <div className="flex h-52 items-center justify-center border border-[#D6D2C8] bg-[#FDFCF8]">
            <span className="bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#55554F]">
              Visualization safe area
            </span>
          </div>
          <div className="mt-5 pl-8">
            <SourceLine figure="01" />
          </div>
        </div>

        <p className="mt-6 max-w-[620px] font-sans text-sm leading-relaxed text-[#55554F]">
          The source line belongs to the downloadable figure—not the surrounding
          page—so it remains visible in PDF, PNG and SVG exports.
        </p>
      </section>

      <hr className="mb-16 border-[#D6D2C8]" />

      <section className="mb-20 max-w-[700px]">
        <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#155C4B]">
          02 — Attribution anatomy
        </p>
        <h2 className="mb-8 font-serif text-2xl leading-tight text-[#20201D]">
          A small, consistent publishing system.
        </h2>

        <div className="grid border border-[#D6D2C8] bg-[#FAFAF8] sm:grid-cols-2">
          {anatomyItems.map((item) => (
            <div
              key={item.number}
              className="min-h-24 border-b border-[#D6D2C8] p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] font-bold text-[#C4A646]">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-sans text-sm font-bold text-[#20201D]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-[#55554F]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="mb-16 border-[#D6D2C8]" />

      <section className="mb-16">
        <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#155C4B]">
          03–05 — Application examples
        </p>
        <h2 className="mb-8 font-serif text-2xl leading-tight text-[#20201D]">
          One attribution pattern across downloadable formats.
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          <ApplicationCard number="03" title="Capacity Utilization">
            <CapacityRing />
          </ApplicationCard>
          <ApplicationCard number="04" title="Capacity Comparison">
            <BarComparison />
          </ApplicationCard>
          <ApplicationCard number="05" title="Taxonomy / Infrastructure">
            <TaxonomySketch />
          </ApplicationCard>
        </div>
      </section>

      <hr className="mb-7 border-[#D6D2C8]" />

      <footer className="flex flex-col gap-5 pb-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#155C4B]">
            Export context
          </p>
          <p className="font-sans text-xs text-[#55554F]">
            Attached source line · protected safe area · never overlays chart data
          </p>
        </div>

        <div className="flex gap-2">
          {["PDF", "PNG", "SVG"].map((format) => (
            <span
              key={format}
              className="border border-[#D6D2C8] px-3 py-2 font-mono text-[10px] font-bold text-[#155C4B]"
            >
              {format}
            </span>
          ))}
        </div>

        <p className="font-sans text-xs text-[#55554F]">
          Readable at large, medium and small figure sizes.
        </p>
      </footer>

      <hr className="border-[#D6D2C8]" />
    </article>
  );
}
