import { useEffect, useState } from "react";
import uniq from "lodash.uniq";
import shuffle from "lodash.shuffle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faShuffle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getKeyWord, proposedSolutionIsCorrect } from "./utils/solutionChecks.ts";
import Button from "./components/Button.tsx";
import RainbowBorder from "./components/RainbowBorder.tsx";
import classNames from "classnames";

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
  const proposedWords = proposedSets.flat();
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
          const isPotentialKeyWord = proposedSets.length === 1
            && proposedWords.includes(word)
            && selected.every(s => !proposedWords.includes(s));
          const isDisabled = (
            // The word is already selected and is not the key word
            proposedWords.includes(word)
            && (!!keyWord && keyWord !== word || !!wipKeyWord && wipKeyWord !== word)
          ) || (
            // The selected set has 2 words, neither of which is a key word, and I am not a key word
            keyWord !== word
            && !isPotentialKeyWord
            && selected.length === 2
            && proposedSets.length > 0
            && !isSelected
            && selected.every(s => !proposedWords.includes(s))
          ) ||
          proposedSets.length === 4;
          const hasRainbowBorder = proposedSets.length < 4 && (isPotentialKeyWord || keyWord === word || wipKeyWord === word);
          const containerClasses= classNames({
            "rounded-md": true,
            "bg-gray-200": isDisabled,
            "text-gray-500": isDisabled,
            "border-gray-500": isDisabled,
            "border-amber-500": isSelected,
            "border-4": isDisabled || isSelected,
            "bg-white": !isDisabled,
            "shadow-md": !isDisabled,
            "selected:shadow-sm": !isDisabled,
            "hover:shadow-lg": !isDisabled,
            "cursor-pointer": !isDisabled,
            "p-1": !isSelected && !isDisabled,
            "hover:p-0": !isSelected && !isDisabled,
            "hover:border-4": !isSelected && !isDisabled,
            "hover:border-black": !isSelected && !isDisabled,
            "-m-1": hasRainbowBorder,
          });

          function selectWord() {
            if (isSelected) {
              const newSelected = [...selected];
              newSelected.splice(selected.indexOf(word), 1);
              setSelected(newSelected);
            } else if (!isDisabled) {
              setSelected([...selected, word]);
            }
          }

          return (
            <div
              key={word}
              className={containerClasses}
              onClick={selectWord}
            >
              <RainbowBorder enabled={hasRainbowBorder} light={isPotentialKeyWord}>
                <div className="text-xl flex justify-center content-center h-full w-full p-3 bg-white">
                  {word}
                </div>
              </RainbowBorder>
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