import { getPublishedCases } from "@/data/cases";
import { PortfolioCard } from "./portfolio-card";

interface PortfolioGridProps {
  limit?: number;
}

export function PortfolioGrid({ limit }: PortfolioGridProps) {
  const cases = getPublishedCases();
  const displayed = limit ? cases.slice(0, limit) : cases;

  if (displayed.length === 0) {
    return (
      <div className="surface-card p-12 text-center text-sm text-[var(--text-muted)]">
        Nenhum projeto disponível no momento.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayed.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  );
}
