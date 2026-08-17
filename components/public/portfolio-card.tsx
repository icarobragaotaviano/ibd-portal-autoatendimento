import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioCase } from "@/data/cases";
import { MediaPlaceholder } from "./media-placeholder";

interface PortfolioCardProps {
  item: PortfolioCase;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="surface-card p-6 sm:p-7 flex flex-col justify-between group border-[var(--border)] transition-all hover:border-amber-500/40"
    >
      <div className="flex flex-col gap-5">
        {/* Cover Media Placeholder */}
        <MediaPlaceholder
          label={`TODO_ASSET_${item.slug.toUpperCase().replace(/-/g, "_")}`}
          type="image"
          aspectRatio="video"
          hint={`Projeto ${item.client}`}
          className="rounded-lg"
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)]">
              {item.client}
            </span>
          </div>

          <h3 className="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {item.title}
          </h3>

          {/* Services Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.services.map((s, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-strong)] text-[var(--text-muted)] border border-[var(--border)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge / Delivery / Result Structured Mini-case */}
        <div className="flex flex-col gap-3 pt-3 border-t border-[var(--border)] text-xs">
          <div>
            <strong className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
              Desafio
            </strong>
            <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-2">
              {item.challenge}
            </p>
          </div>

          <div>
            <strong className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
              Entrega
            </strong>
            <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-2">
              {item.delivery}
            </p>
          </div>

          <div>
            <strong className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] block mb-0.5">
              Resultado
            </strong>
            <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-2">
              {item.result}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 pt-6 mt-4 border-t border-[var(--border)] text-xs font-mono font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
        <span>Ver case completo</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
