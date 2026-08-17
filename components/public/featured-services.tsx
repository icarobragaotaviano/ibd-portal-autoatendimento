import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedServices } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./service-card";

export function FeaturedServices() {
  const featured = getFeaturedServices(4);

  return (
    <Section spacing="lg">
      <Container size="lg">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[var(--border)]">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="eyebrow">Soluções • Serviços Principais</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Serviços em destaque
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Estrutura visual completa para marcas que buscam clareza, consistência e autoridade.
              </p>
            </div>

            <Link href="/servicos">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Ver todos os serviços
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
