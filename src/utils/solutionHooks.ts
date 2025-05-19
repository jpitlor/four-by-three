import { useSearchParams } from "react-router";
import type { ObscuredSolution, Solution } from "./Models.ts";

const localStorageSolution = "current";
const localStorageSolved = "solved";
const solutions: ObscuredSolution[] = [
  { id: "1", solution: "W3sibmFtZSI6IkhhcmR3YXJlIiwiaXRlbXMiOlsiQm9sdCIsIldhc2hlciIsIk51dCJdfSx7Im5hbWUiOiJMaWdodG5pbmcgX18iLCJpdGVtcyI6WyJCb2x0IiwiU3RyaWtlIiwiTWNRdWVlbiJdfSx7Im5hbWUiOiJNb3ZlIEZhc3QiLCJpdGVtcyI6WyJCb2x0IiwiUnVuIiwiU3ByaW50Il19LHsibmFtZSI6Ik1lZGlldmFsIEFtbW8iLCJpdGVtcyI6WyJCb2x0IiwiRGFydCIsIkFycm93Il19XQ==" }
];

export function useSolution() {
  const solutionFromUrl = useSolutionFromUrl();
  if (solutionFromUrl) {
    localStorage.setItem(localStorageSolution, JSON.stringify(solutionFromUrl));
    return solutionFromUrl;
  }

  const solved = JSON.parse(localStorage.getItem(localStorageSolved) ?? "[]");
  const solution = solutions.find(x => !solved.includes(x.id));
  if (!solution) {
    return undefined;
  }

  return JSON.parse(atob(solution.solution)) as Solution;
}

function useSolutionFromUrl(): Solution | null {
  const [searchParams] = useSearchParams();
  const s = searchParams.get("s");
  if (!s) {
    return null;
  }

  const solution = atob(s);
  return JSON.parse(solution) as Solution;
}