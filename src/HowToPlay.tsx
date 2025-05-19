import Game from "./components/Game.tsx";
import type { Solution } from "./utils/Models.ts";
import { Card } from "./components/Card.tsx";
import RainbowBorder from "./components/RainbowBorder.tsx";

export default function HowToPlay() {
  const solution = [
    { name: "Metals", items: ["Mercury", "Iron", "Gold"] },
    { name: "Classic Rock Singers", items: ["Mercury", "Plant", "Bowie"] },
    { name: "Planets", items: ["Mercury", "Earth", "Venus"] },
    { name: "Rockets", items: ["Mercury", "Atlas", "Falcon"] },
  ] as Solution;

  return (
    <>
      <Card>
        <h2 className="text-4xl text-center mb-4">About the Game</h2>
        <p>
          4x3 is simple to play: there is a grid of nine words, and your goal is to
          find four groups of three words from this grid. You might think that this is
          impossible because 4 * 3 = 12, but there are only nine words! The trick is that
          every category shares a special key word! Take the following grid:
        </p>
        <div className="bg-gray-100 shadow mt-4 mb-4">
          <Game
            solution={solution}
            selected={[]}
            setSelected={() => {}}
            proposedCategories={[]}
            hideShuffle={true}
            disabled={true}
          />
        </div>
        <p>
          In this example, the four categories are planets, metals, rockets, and classic
          rock singers. "Mercury" can apply to all four of those categories, so it is the
          key word. Try figuring out the rest of the sets!
        </p>
      </Card>
      <Card>
        <h2 className="text-4xl text-center mb-4">Proposing Categories</h2>
        <p className="mb-2">
          The game makes sure that when you're proposing a category, it has
          a key word. The key word will be highlighted in a rainbow border like
          this:
        </p>
        <RainbowBorder>
          <div className="text-xl flex justify-center content-center h-full w-full p-3 bg-white">
            Mercury
          </div>
        </RainbowBorder>
        <p className="mt-4">
          If you propose your first category, the options for
          key words will all have a pale version of the border until
          you select one. For example:
        </p>
        <div className="bg-gray-100 shadow mt-2">
          <Game
            solution={solution}
            selected={[]}
            setSelected={() => {}}
            proposedCategories={[ { name: "", items: ["Mercury", "Iron", "Gold"] }]}
            hideShuffle={true}
            disabled={true}
          />
        </div>
      </Card>
    </>
  );
}