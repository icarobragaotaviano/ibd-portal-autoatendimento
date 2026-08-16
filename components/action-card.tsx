import Link from "next/link";

export function ActionCard({
  number,
  title,
  description,
  href,
  cta,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <article className="card p-6 md:p-8 flex flex-col min-h-72">
      <span className="eyebrow">{number}</span>
      <h2 className="display text-3xl md:text-4xl mt-5">{title}</h2>
      <p className="muted leading-7 mt-4 mb-8">{description}</p>
      <Link href={href} className="btn-secondary mt-auto self-start">{cta} →</Link>
    </article>
  );
}
