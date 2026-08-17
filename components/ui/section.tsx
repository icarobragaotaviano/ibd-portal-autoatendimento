import React from "react";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
}

export function Section({
  children,
  spacing = "lg",
  className = "",
  ...props
}: SectionProps) {
  const spacingStyles = {
    sm: "py-6 sm:py-8",
    md: "py-10 sm:py-14",
    lg: "py-16 sm:py-24",
    xl: "py-20 sm:py-32",
  };

  return (
    <section className={`w-full ${spacingStyles[spacing]} ${className}`} {...props}>
      {children}
    </section>
  );
}
