import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Service, formatServicePricing, formatServiceDeadline } from "@/data/services";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "./media-placeholder";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const pricingLabel = formatServicePricing(service.pricing);
  const deadlineLabel = formatServiceDeadline(service.deadline);

  return (
    <div className="surface-card p-6 sm:p-7 flex flex-col justify-between group border-[var(--border)] transition-all hover:border-amber-500/30">
      <div className="flex flex-col gap-5">
        {/* Mockup Placeholder */}
        <MediaPlaceholder
          label={`TODO_ASSET_${service.slug.toUpperCase()}`}
          type="image"
          aspectRatio="video"
          className="rounded-lg"
        />

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {service.name}
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {service.shortPromise}
          </p>
        </div>

        {/* Includes Checklist */}
        {service.includes && service.includes.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
            <span className="text-[11px] font-mono font-bold uppercase text-[var(--text-muted)]">
              Inclui:
            </span>
            <ul className="grid gap-1.5">
              {service.includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-[var(--border)]">
        {/* Pricing & Deadline */}
        <div className="flex flex-col gap-1 text-xs font-mono">
          <span className="text-[var(--accent)] font-bold">{pricingLabel}</span>
          <span className="text-[var(--text-muted)] text-[11px]">{deadlineLabel}</span>
        </div>

        {/* CTA Button with Query Parameter */}
        <Link href={`/comecar?service=${encodeURIComponent(service.slug)}`} className="w-full">
          <Button
            variant="secondary"
            size="md"
            className="w-full group-hover:bg-[var(--surface-strong)]"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            COMEÇAR COM ESTE SERVIÇO
          </Button>
        </Link>
      </div>
    </div>
  );
}
