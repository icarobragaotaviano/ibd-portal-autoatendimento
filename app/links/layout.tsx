import React from "react";

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center justify-start antialiased selection:bg-[var(--accent)] selection:text-[#050505]">
      {children}
    </div>
  );
}
