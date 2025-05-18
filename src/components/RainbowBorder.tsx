import type { JSX } from "react";

export default function RainbowBorder({ children, className }: { children: JSX.Element, className?: string }) {
  return (
    <div className={`p-1 rounded relative ${className}`}>
      <div className="animate-border bg-conic-rainbow -m-1 absolute w-full h-full rounded" />
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}