import { useEffect, useState } from "react";
import uniq from "lodash.uniq";
import shuffle from "lodash.shuffle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faShuffle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getKeyWord, proposedSolutionIsCorrect } from "./utils/solutionChecks.ts";
import Button from "./components/Button.tsx";

const solution = [
  ["Bolt", "Washer", "Nut"],
  ["Bolt", "Strike", "McQueen"],
  ["Bolt", "Run", "Sprint"],
  ["Bolt", "Dart", "Arrow"]
]

export default function PlayGame() {
  const [words, setWords] = useState(uniq(solution.flat()));
  const [proposedSets, setProposedSets] = useState([] as string[][]);
  const [selected, setSelected] = useState([] as string[]);

  const canCheckSolution = proposedSets.length === 4;
  const keyWord = getKeyWord(proposedSets);
  const wipKeyWord = getKeyWord([...proposedSets, selected]);

  function handleShuffle() {
    setWords(shuffle(words));
  }

  function checkSolution() {
    alert(proposedSolutionIsCorrect(proposedSets, solution));
  }

  useEffect(() => {
    if (selected.length < 3) {
      return;
    }

    setProposedSets([...proposedSets, [...selected]]);
    setSelected([]);
  }, [proposedSets, selected])

  return (
    <div>
      <div className="flex flex-row gap-4 justify-center content-center mt-4 mb-8">
        <Button onClick={handleShuffle} icon={faShuffle} text="Shuffle" />
        <Button onClick={checkSolution} disabled={!canCheckSolution} icon={faCheck} text="Check Solution" />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {words.map(word => {
          const isSelected = selected.includes(word);
          const activeClasses = isSelected
            ? "border-4 border-amber-500"
            : "p-1 hover:p-0 hover:border-4 hover:border-black";

          const isDisabled = (proposedSets.flat().includes(word) && !!keyWord && keyWord !== word)
            || (proposedSets.length === 1 && proposedSets.flat().includes(word) && !!wipKeyWord && wipKeyWord !== word);
          const containerClasses = isDisabled
            ? "rounded-md bg-gray-200 text-gray-500 border-gray-500 border-4"
            : `rounded-md bg-white shadow-md hover:shadow-lg cursor-pointer ${activeClasses}`;

          function selectWord() {
            if (isSelected) {
              const newSelected = [...selected];
              newSelected.splice(selected.indexOf(word), 1);
              setSelected(newSelected);
            } else {
              setSelected([...selected, word]);
            }
          }

          return (
            <div
              key={word}
              className={containerClasses}
              onClick={selectWord}
            >
              <div className="text-xl flex justify-center content-center h-full w-full p-3">
                {word}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-lg text-center text-emerald-700 underline underline-offset-4">Proposed Sets</h2>
        {proposedSets.map((proposedSet, i) => {
          function remove() {
            const newProposedSets = [...proposedSets];
            newProposedSets.splice(i, 1);
            setProposedSets(newProposedSets);
          }

          return (
            <div className="flex flex-row pl-4 pr-4">
              <span className="flex-1 text-lg">{proposedSet.join(", ")}</span>
              <FontAwesomeIcon
                icon={faClose}
                className="bg-red-500 text-white rounded-full inline-block w-4 h-4! cursor-pointer"
                onClick={remove}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}