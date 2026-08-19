import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import CitationCopyCard from "./CitationCopyCard";
import type { CitationsData } from "@/lib/types";

export const metadata: Metadata = {
  title: "Cómo citar este informe — PhysaFlow",
  description:
    "Formatos de cita académica y periodística para el PhysaFlow Stranded Capacity Index.",
};

const fallbackCitations: CitationsData = {
  academic:
    "Author/Organization. (Year). PhysaFlow Stranded Capacity Index. PhysaFlow. URL",
  journalistic:
    "PhysaFlow, “PhysaFlow Stranded Capacity Index,” public industry report.",
  attribution: "Source: PhysaFlow Stranded Capacity Index",
  meta: {
    author: "PhysaFlow",
    year: 2026,
    title: "PhysaFlow Stranded Capacity Index",
    url: "https://physaflow.com/stranded-capacity-index",
  },
};

function getCitations(): CitationsData {
  const fullPath = path.join(process.cwd(), "..", "backend", "data", "citations.json");

  if (!fs.existsSync(fullPath)) {
    return fallbackCitations;
  }

  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as CitationsData;
}

export default function ComoCitarPage() {
  const citations = getCitations();

  return (
    <article className="min-h-screen bg-[#FAFAF8] px-0 py-14 text-[#20201D]">
      <header className="mb-16">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3C3C37]">
          03 — How to cite this report / Wireframe
        </p>
        <h1 className="font-serif text-5xl leading-[0.98] tracking-normal text-black md:text-6xl">
          Cómo citar este informe
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-sm leading-relaxed text-[#3C3C37]">
          UX wireframe for academic and journalistic citation of the PhysaFlow
          Stranded Capacity Index.
        </p>
      </header>

      <hr className="mb-12 border-[#A8A8A1]" />

      <section className="mb-14">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3C3C37]">
          01 — Desktop / Default
        </p>
        <h2 className="mb-8 max-w-[620px] font-serif text-2xl leading-tight text-[#20201D]">
          Use the appropriate format below when referencing the PhysaFlow
          Stranded Capacity Index.
        </h2>

        <div className="flex flex-col gap-5">
          <CitationCopyCard label="APA 7" citation={citations.academic} />
          <CitationCopyCard
            label="Journalistic"
            citation={citations.journalistic}
          />
        </div>
      </section>

      <hr className="mb-12 border-[#A8A8A1]" />

      <section className="mb-14">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3C3C37]">
          02 — Copy interaction
        </p>
        <h2 className="mb-8 font-serif text-2xl leading-tight text-[#20201D]">
          Clear status without interrupting reading.
        </h2>

        <div className="flex flex-wrap items-center gap-5 py-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[#3C3C37]">
            Default
          </span>
          <button
            type="button"
            className="h-9 border border-[#20201D] bg-[#FAFAF8] px-4 font-sans text-xs font-semibold text-[#20201D]"
          >
            Copy citation
          </button>
          <span className="font-mono text-xs text-[#3C3C37]">→</span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[#3C3C37]">
            Success
          </span>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="h-9 border border-[#20201D] bg-[#EEF4EF] px-4 font-sans text-xs font-semibold text-[#20201D]"
            >
              ✓ Copied
            </button>
            <span className="font-sans text-[11px] text-[#63635E]">
              Citation copied to clipboard.
            </span>
          </div>
        </div>
      </section>

      <hr className="mb-12 border-[#A8A8A1]" />

      <section>
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3C3C37]">
          04 — UX anatomy
        </p>
        <h2 className="mb-8 font-serif text-2xl leading-tight text-[#20201D]">
          One consistent pattern for both citation formats.
        </h2>

        <div className="grid border border-[#8C8C86] bg-[#FAFAF8] text-xs text-[#3C3C37] sm:grid-cols-2">
          {[
            "Citation format identification",
            "Selectable citation text",
            "Copy action",
            "Success feedback announced to assistive technology",
            "Responsive behavior at 390px",
          ].map((item, index) => (
            <div
              key={item}
              className="flex min-h-10 items-center gap-3 border-b border-[#BDBDB7] px-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
            >
              <span className="font-mono text-[10px] font-bold text-[#20201D]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="mt-14 border-[#A8A8A1]" />
    </article>
  );
}
