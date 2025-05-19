import type { Solution } from "./Models.ts";
import uniq from "lodash.uniq";

export function proposedSolutionIsCorrect(proposed: Solution, actual: Solution): boolean {
  for (const proposedCategory of proposed) {
    const hasMatch = actual.some(actualCategory =>
      actualCategory.items.every(actualWord =>
        proposedCategory.items.includes(actualWord)))
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

  const allWords = uniq(proposed.flatMap(c => c.items));
  return allWords.find(word => proposed.every(category => category.items.includes(word)));
}
