import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  gold = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  gold?: boolean;
  as?: "div" | "article" | "aside";
}) {
  return (
    <Tag
      className={`glass grain relative overflow-hidden rounded-md ${
        gold ? "glass-gold" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
