import Game from "./components/Game.tsx";
import type { Solution } from "./utils/Models.ts";
import { Card } from "./components/Card.tsx";

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
        <p>
          4x3 is simple to play: there is a grid of nine words, and your goal is to
          find four groups of three words from this grid. You might think that this is
          impossible because <pre>4 * 3 = 12</pre>, but there are only nine words!
        </p>
        <p>
          The trick is that every category shares a special key word! For example,
          take the following grid:
        </p>
        <Game
          solution={solution}
          selected={[]}
          setSelected={() => {}}
          proposedCategories={[]}
          hideShuffle={true}
          disabled={true}
        />
      </Card>
    </>
  );
}