import { Reveal } from "./motion";

export function PageHero({
  n,
  eyebrow,
  title,
  lede,
  children,
}: {
  n?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-x pb-16 pt-36 lg:pb-24 lg:pt-48">
      <Reveal>
        <p className="eyebrow flex gap-4">
          {n && <span className="num">{n}</span>} {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="display h-xl mt-8 max-w-5xl">{title}</h1>
      </Reveal>
      {lede && (
        <Reveal delay={0.2}>
          <p className="lede mt-8">{lede}</p>
        </Reveal>
      )}
      {children && <Reveal delay={0.3} className="mt-10">{children}</Reveal>}
    </header>
  );
}

export function ClosingCta({ title = "Start with the right questions.", href = "/contact?type=consultation" }: { title?: string; href?: string }) {
  return (
    <section className="on-dark bg-ink py-24 text-ivory">
      <div className="container-x flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <h2 className="display h-lg max-w-3xl">
          {title}
        </h2>
        <a href={href} className="btn btn-solid">Schedule a consultation</a>
      </div>
    </section>
  );
}
