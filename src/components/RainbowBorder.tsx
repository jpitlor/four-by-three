import type { JSX } from "react";

export default function RainbowBorder({
  children,
  className,
  light = false,
  enabled = true,
  roundedFull = false,
}: {
  children: JSX.Element,
  className?: string,
  light?: boolean,
  enabled?: boolean,
  roundedFull?: boolean,
}) {
  if (!enabled) {
    return children;
  }

  const rainbowClass = light ? "bg-conic-rainbow-light" : "bg-conic-rainbow";
  return (
    <div className={`p-1 rounded relative ${className}`}>
      <div className={`animate-border ${rainbowClass} -m-1 absolute w-full h-full ${roundedFull ? "rounded-full" : "rounded"}`} />
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}