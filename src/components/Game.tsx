import type { Solution } from "../utils/Models.ts";
import classNames from "classnames";
import RainbowBorder from "./RainbowBorder.tsx";
import { getKeyWord } from "../utils/solutionChecks.ts";
import uniq from "lodash.uniq";
import { useCallback, useEffect, useState } from "react";
import shuffle from "lodash.shuffle";
import { faPencil, faQuestionCircle, faShuffle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Button from "./Button.tsx";
import CreateGame from "./CreateGame.tsx";

export default function Game({
  solution,
  selected,
  setSelected,
  proposedCategories,
}: {
  solution: Solution,
  selected: string[],
  setSelected: (s: string[]) => void,
  proposedCategories: Solution,
}) {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [words, setWords] = useState(uniq(solution?.flatMap(c => c.items)));
  const proposedWords = proposedCategories.flatMap(c => c.items);
  const keyWord = getKeyWord(proposedCategories);
  const wipKeyWord = getKeyWord([...proposedCategories, { name: "", items: selected }]);

  const handleShuffle = useCallback(() => {
    setWords(shuffle(words));
  }, [words]);

  function openHowToPlay() {
    setIsHowToPlayOpen(true);
  }

  function closeHowToPlay() {
    setIsHowToPlayOpen(false);
  }

  function openCreateGame() {
    setIsCreateGameOpen(true);
  }

  function closeCreateGame() {
    setIsCreateGameOpen(false);
  }

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-4 justify-center content-center mt-4">
        <Button onClick={handleShuffle} icon={faShuffle} text="Shuffle" />
        <Button onClick={openHowToPlay} icon={faQuestionCircle} text="How To Play" />
        <Button onClick={openCreateGame} icon={faPencil} text="Create Game" />
      </div>
      <Modal
        isOpen={isHowToPlayOpen}
        onRequestClose={closeHowToPlay}
        contentLabel="How To Play"
      >
        4x3 is simple to play: there is a grid of nine words, and your goal is to
        find four groups of three words from this grid. You might think that this is
        impossible because 4 * 3 = 12, but there are only nine words! The trick is that
        every category shares a special key word!
      </Modal>
      <Modal
        isOpen={isCreateGameOpen}
        onRequestClose={closeCreateGame}
        contentLabel="Create Game"
      >
        <CreateGame />
      </Modal>
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
    </div>
  )
}