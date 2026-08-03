import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { REPORT_SECTIONS } from "./report-sections";

export interface ReportSection {
  id: string;
  label: string;
  title: string;
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content");

export function getReportSections(): ReportSection[] {
  return REPORT_SECTIONS.map(({ id, slug, label }) => {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return { id, label, title: label, content: "" };
    }

    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    return {
      id,
      label,
      title: typeof data.title === "string" ? data.title : label,
      content: content.trim(),
    };
  });
}
