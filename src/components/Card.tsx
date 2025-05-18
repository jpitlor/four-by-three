import type { JSX } from "react";

export function Card({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element {
  return (
    <div className="m-4 p-4 rounded-md bg-white shadow">
      {children}
    </div>
  )
}