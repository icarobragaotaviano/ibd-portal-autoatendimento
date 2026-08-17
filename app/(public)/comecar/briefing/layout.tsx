import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing Guiado • IBD",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BriefingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
