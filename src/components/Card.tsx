import * as React from "react";

export function Card({ children, className }: {
  children: React.ReactNode | React.ReactNode[],
  className?: string,
}) {
  return (
    <div className={`m-4 p-4 rounded-md bg-white shadow ${className}`}>
      {children}
    </div>
  )
}