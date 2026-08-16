export function OrientationCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="rounded-2xl border border-[#c9b09d] bg-[#efe4d9] p-5" aria-label={title}>
      <div className="eyebrow mb-2">Orientação</div>
      <h2 className="font-black mb-2">{title}</h2>
      <div className="text-sm leading-6 text-[#4f433a]">{children}</div>
    </aside>
  );
}
