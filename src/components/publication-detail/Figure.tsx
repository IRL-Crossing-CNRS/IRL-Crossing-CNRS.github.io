export default function Figure({
  src,
  alt,
  caption,
  light = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  light?: boolean;
}) {
  return (
    <figure>
      <div
        className={`overflow-hidden rounded-xl border border-border ${light ? 'bg-white' : 'bg-surface'}`}
      >
        <img src={src} alt={alt} loading="lazy" className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
