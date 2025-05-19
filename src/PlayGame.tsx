import { useEffect, useState } from "react";
import uniq from "lodash.uniq";
import shuffle from "lodash.shuffle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faShuffle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getKeyWord, proposedSolutionIsCorrect } from "./utils/solutionChecks.ts";
import Button from "./components/Button.tsx";
import RainbowBorder from "./components/RainbowBorder.tsx";
import classNames from "classnames";
import type { Solution } from "./utils/Models.ts";
import { useSolution } from "./utils/solutionHooks.ts";
import { Card } from "./components/Card.tsx";

export default function PlayGame() {
  const solution = useSolution();
  const [words, setWords] = useState(uniq(solution?.flatMap(c => c.items)));
  const [proposedCategories, setProposedCategories] = useState([] as Solution);
  const [selected, setSelected] = useState([] as string[]);

  const canCheckSolution = proposedCategories.length === 4;
  const proposedWords = proposedCategories.flatMap(c => c.items);
  const keyWord = getKeyWord(proposedCategories);
  const wipKeyWord = getKeyWord([...proposedCategories, { name: "", items: selected }]);

  function handleShuffle() {
    setWords(shuffle(words));
  }

  function checkSolution() {
    if (!solution) {
      return;
    }

    alert(proposedSolutionIsCorrect(proposedCategories, solution));
  }

  useEffect(() => {
    if (selected.length < 3) {
      return;
    }

    setProposedCategories([...proposedCategories, { name: "", items: [...selected] }]);
    setSelected([]);
  }, [proposedCategories, selected]);

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-4 justify-center content-center mt-4 mb-8">
        <Button onClick={handleShuffle} icon={faShuffle} text="Shuffle" />
        <Button onClick={checkSolution} disabled={!canCheckSolution} icon={faCheck} text="Check Solution" />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 p-4">
        {words.map(word => {
          const isSelected = selected.includes(word);
          const isPotentialKeyWord = proposedCategories.length === 1
            && proposedWords.includes(word)
            && selected.every(s => !proposedWords.includes(s));
          const isDisabled = (
            // The word is already selected and is not the key word
            proposedWords.includes(word)
            && (!!keyWord && keyWord !== word || !!wipKeyWord && wipKeyWord !== word)
          ) || (
            // The selected category has 2 words, neither of which is a key word, and I am not a key word
            keyWord !== word
            && !isPotentialKeyWord
            && selected.length === 2
            && proposedCategories.length > 0
            && !isSelected
            && selected.every(s => !proposedWords.includes(s))
          ) ||
          proposedCategories.length === 4;
          const hasRainbowBorder = proposedCategories.length < 4 && (isPotentialKeyWord || keyWord === word || wipKeyWord === word);
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
      <Card className="flex flex-col gap-4 mt-4">
        <h2 className="text-lg text-center text-emerald-700">Proposed Categories</h2>
        {proposedCategories.length === 0 && <div className="text-center">
            <p className="text-xl text-gray-500 m-4 italic">Pick sets of words to propose categories!</p>
        </div>}
        {proposedCategories.map((proposedCategory, i) => {
          function remove() {
            const newProposedCategories = [...proposedCategories];
            newProposedCategories.splice(i, 1);
            setProposedCategories(newProposedCategories);
          }

          return (
            <div className="flex flex-row pl-4 pr-4 m-auto" key={i}>
              <span className="flex-1 text-lg">{proposedCategory.items.join(", ")}</span>
              <FontAwesomeIcon
                icon={faClose}
                className="bg-red-500 ml-4 mt-2 mb-2 text-white rounded-full inline-block w-4 h-4! cursor-pointer"
                onClick={remove}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
}