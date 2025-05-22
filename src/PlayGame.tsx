import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import { proposedSolutionIsCorrect } from "./utils/solutionChecks.ts";
import Button from "./components/Button.tsx";
import type { Solution } from "./utils/Models.ts";
import { useSolution } from "./utils/solutionHooks.ts";
import { Card } from "./components/Card.tsx";
import Game from "./components/Game.tsx";

export default function PlayGame() {
  const solution = useSolution();
  const [proposedCategories, setProposedCategories] = useState([] as Solution);
  const [selected, setSelected] = useState([] as string[]);
  const canCheckSolution = proposedCategories.length === 4;

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


  if (!solution) {
    return <div>Uh oh, no solution!</div>;
  }

  return (
    <div className="bg-gray-100 h-screen overflow-y-auto">
      <Game
        solution={solution}
        selected={selected}
        setSelected={setSelected}
        proposedCategories={proposedCategories}
      />
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

        {canCheckSolution && <div className="flex flex-row gap-4 justify-center content-center mt-4 mb-8">
          <Button onClick={checkSolution} icon={faCheck} text="Check Solution" />
        </div>}
      </Card>
    </div>
  );
}