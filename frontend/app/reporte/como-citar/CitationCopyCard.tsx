"use client";

import { useState } from "react";

interface CitationCopyCardProps {
  label: string;
  citation: string;
}

export default function CitationCopyCard({
  label,
  citation,
}: CitationCopyCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="border border-[#8C8C86] bg-[#FAFAF8] p-5">
      <div className="flex items-center justify-between gap-4 border-b border-[#BDBDB7] pb-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[#20201D]">
          {label}
        </span>
        <span className="font-sans text-[10px] text-[#63635E]">
          Reusable citation option
        </span>
      </div>

      <p className="select-all py-5 font-serif text-sm leading-relaxed text-[#20201D]">
        {citation}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="h-9 border border-[#20201D] bg-[#FAFAF8] px-4 font-sans text-xs font-semibold text-[#20201D] transition-colors hover:bg-[#20201D] hover:text-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-[#20201D] focus:ring-offset-2"
        >
          {copied ? "✓ Copied" : "Copy citation"}
        </button>
        <span
          className="font-sans text-[11px] text-[#63635E]"
          role="status"
          aria-live="polite"
        >
          {copied ? "Citation copied to clipboard." : ""}
        </span>
      </div>
    </article>
  );
}
