import type { Solution } from "./Models.ts";
import uniq from "lodash.uniq";

export function proposedSolutionIsCorrect(proposed: Solution, actual: Solution): boolean {
  for (const proposedSet of proposed) {
    const hasMatch = actual.some(actualSet => actualSet.every(actualWord => proposedSet.includes(actualWord)))
    if (!hasMatch) {
      return false;
    }
  }

  return true;
}

export function getKeyWord(proposed: Solution): string | undefined {
  if (proposed.length < 2) {
    return undefined;
  }

  const allWords = uniq(proposed.flat());
  return allWords.find(word => proposed.every(set => set.includes(word)));
}
