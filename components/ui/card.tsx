import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  variant = "default",
  hoverable = false,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-[var(--surface)] border-[var(--border)]",
    elevated: "bg-[var(--surface-elevated)] border-[var(--border)]",
    interactive:
      "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] transition-colors duration-200 cursor-pointer",
  };

  const hoverStyle =
    hoverable && variant !== "interactive"
      ? "hover:border-[var(--border-hover)] hover:bg-[var(--surface-elevated)] transition-colors duration-200"
      : "";

  return (
    <div
      className={`border rounded-[var(--radius-lg)] p-6 ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1.5 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-display text-lg font-bold text-[var(--text-primary)] tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[var(--text-muted)] leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
