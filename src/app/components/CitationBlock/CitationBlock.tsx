import React from 'react';

export type CitationStyle = 'apa7' | 'journalistic';

export interface CitationBlockProps {
  author: string;
  year: number | string;
  title: string;
  url: string;
  style?: CitationStyle;
  className?: string;
}

export const CitationBlock: React.FC<CitationBlockProps> = ({
  author,
  year,
  title,
  url,
  style = 'apa7',
  className = '',
}) => {
  const isJournalistic = style === 'journalistic';

  return (
    <figure className={`my-4 p-4 border-l-4 border-indigo-500 bg-slate-50 dark:bg-slate-800 rounded-r-lg text-sm ${className}`}>
      <blockquote className="text-slate-700 dark:text-slate-200 italic">
        {isJournalistic ? (
          <span>«{title}», por <strong>{author}</strong> ({year}).</span>
        ) : (
          <span><strong>{author}</strong> ({year}). <em>{title}</em>.</span>
        )}
      </blockquote>

      {url && (
        <figcaption className="mt-2 text-xs">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline font-medium inline-flex items-center gap-1"
          >
            Fuente original ↗
          </a>
        </figcaption>
      )}
    </figure>
  );
};

export default CitationBlock;