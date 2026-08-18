export const services = [
  { value: "identidade_visual", label: "Identidade visual" },
  { value: "social_media", label: "Peças para redes sociais" },
  { value: "landing_page", label: "Landing page / página de vendas" },
  { value: "editorial", label: "Material editorial / e-book" },
  { value: "apresentacao", label: "Apresentação" },
  { value: "outro", label: "Outro projeto" },
] as const;

export function getServiceLabel(value: string) {
  return services.find((service) => service.value === value)?.label ?? value;
}
