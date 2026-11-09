import type { ReactNode } from 'react';

/* Building blocks for long-form technical documents: numbered sections, figures, tables,
   algorithms and cross-references. Numbers are passed in explicitly so that every reference
   in the text matches the label printed on the page. */

export function DocSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-14">
      <h2 className="flex items-baseline gap-3 text-[1.6rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.75rem]">
        {number && <span className="tabular-nums text-accent">{number}</span>}
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function DocSubsection({
  id,
  number,
  title,
  children,
}: {
  id?: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28 space-y-5 pt-4">
      <h3 className="flex items-baseline gap-2.5 text-lg font-semibold leading-snug text-foreground">
        <span className="tabular-nums text-muted">{number}</span>
        <span>{title}</span>
      </h3>
      {children}
    </div>
  );
}

export function DocFigure({
  id,
  number,
  caption,
  children,
}: {
  id: string;
  number: number | string;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure id={id} className="scroll-mt-28 py-3">
      <div className="overflow-hidden rounded-lg border border-border bg-white">{children}</div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-foreground">Figure {number}.</span> {caption}
      </figcaption>
    </figure>
  );
}

/** A figure image that opens at full size in a new tab, for diagrams that are dense at column width. */
export function DocImage({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <a href={src} target="_blank" rel="noreferrer noopener" title="Open the figure at full size" className="block cursor-zoom-in">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="block h-auto w-full" />
    </a>
  );
}

export function DocTable({
  id,
  number,
  caption,
  head,
  rows,
  notes,
  align,
}: {
  id: string;
  number: number | string;
  caption: ReactNode;
  head: ReactNode[];
  rows: ReactNode[][];
  notes?: ReactNode;
  /** Per-column alignment; numeric columns read best right-aligned. */
  align?: ('left' | 'right' | 'center')[];
}) {
  const alignClass = (index: number) =>
    align?.[index] === 'right'
      ? 'whitespace-nowrap text-right tabular-nums'
      : align?.[index] === 'center'
        ? 'text-center'
        : 'text-left';
  const captionId = `${id}-caption`;
  return (
    <figure id={id} className="scroll-mt-28 py-3">
      <figcaption id={captionId} className="mb-3 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-foreground">Table {number}.</span> {caption}
      </figcaption>
      <div className="overflow-x-auto">
        <table aria-labelledby={captionId} className="w-full border-y-2 border-foreground/60 text-sm leading-relaxed">
          <thead className="border-b border-foreground/35">
            <tr>
              {head.map((cell, index) => (
                <th key={index} scope="col" className={`px-3 py-2 align-bottom font-semibold text-foreground first:pl-0 last:pr-0 ${alignClass(index)}`}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-border last:border-0">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row" className={`px-3 py-2 align-top font-medium text-foreground first:pl-0 last:pr-0 ${alignClass(index)}`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={index} className={`px-3 py-2 align-top text-foreground/80 first:pl-0 last:pr-0 ${alignClass(index)}`}>
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {notes && <p className="mt-2 text-xs leading-relaxed text-muted">{notes}</p>}
    </figure>
  );
}

export function Algorithm({ id, number, title, lines }: { id: string; number: number; title: string; lines: string[] }) {
  return (
    <figure id={id} className="scroll-mt-28 overflow-hidden rounded-lg border border-border bg-surface">
      <figcaption className="border-b border-border px-4 py-2.5 text-sm text-foreground">
        <span className="font-semibold">Algorithm {number}.</span> {title}
      </figcaption>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-6 text-foreground/85">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="block">
              <span className="mr-4 inline-block w-5 select-none text-right text-muted/70">{index + 1}</span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function Listing({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface px-4 py-3 font-mono text-[12.5px] leading-6 text-foreground/85">
      <code>{children}</code>
    </pre>
  );
}

export function Cite({ refs }: { refs: number[] }) {
  return (
    <span className="whitespace-nowrap">
      [
      {refs.map((ref, index) => (
        <span key={ref}>
          <a href={`#ref-${ref}`} className="text-accent hover:underline">
            {ref}
          </a>
          {index < refs.length - 1 && ', '}
        </span>
      ))}
      ]
    </span>
  );
}

export function XRef({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent underline-offset-2 hover:underline">
      {children}
    </a>
  );
}

export function Remark({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-accent bg-accent-soft/60 px-4 py-3 text-[0.95rem] leading-relaxed">
      <span className="font-semibold text-foreground">{title}</span> {children}
    </div>
  );
}
