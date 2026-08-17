import { redirect } from "next/navigation";

export default async function SolicitarRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  if (service) {
    redirect(`/comecar?service=${encodeURIComponent(service)}`);
  }
  redirect("/comecar");
}
