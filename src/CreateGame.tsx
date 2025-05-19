import { type ChangeEvent, type FormEvent, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import type { Solution } from "./utils/Models.ts";
import Button from "./components/Button.tsx";
import { Card } from "./components/Card.tsx";
import RainbowBorder from "./components/RainbowBorder.tsx";

export default function CreateGame() {
  const [solution, setSolution] = useState<Solution>([
    { name: "", items: ["", "", ""] },
    { name: "", items: ["", "", ""] },
    { name: "", items: ["", "", ""] },
    { name: "", items: ["", "", ""] },
  ]);
  const [url, setUrl] = useState("");

  const inputClasses = "p-1 pl-4 pr-4 border-2 border-gray-500 rounded-sm flex-1 bg-white disabled:bg-gray-200 disabled:text-gray-500";
  const canMakeGame = solution.every(category => category.items.every(word => !!word));

  function setKeyWord(e: ChangeEvent<HTMLInputElement>) {
    const newSolution = cloneDeep(solution);
    newSolution.forEach(x => x.items[0] = e.target.value);
    setSolution(newSolution);
    setUrl("");
  }

  function setWord(i: number, j: number) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newSolution = cloneDeep(solution);
      newSolution[i].items[j] = e.target.value;
      setSolution(newSolution);
      setUrl("");
    }
  }

  function makeGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const s = btoa(JSON.stringify(solution));
    setUrl(`${import.meta.env.BASE_URL}/?s=${s}`)
    return false;
  }

  return (
    <>
      <Card>
        <form onSubmit={makeGame}>
          <h2 className="text-lg text-center">Key Word</h2>
          <div className="flex mt-2">
            <RainbowBorder className="flex-1 flex">
              <input
                value={solution[0].items[0]}
                onChange={setKeyWord}
                className={`w-full ${inputClasses} border-none!`}
              />
            </RainbowBorder>
          </div>

          {solution.map((category, i) => (
            <div key={i} className="mt-8 flex flex-col">
              <h2 className="text-lg text-center">Category {i + 1}</h2>
              <div className="flex lg:flex-row flex-col gap-4 mt-2">
              {category.items.map((word, j) => (
                <input
                  key={`${i}-${j}`}
                  value={word}
                  onChange={setWord(i, j)}
                  disabled={j === 0}
                  className={inputClasses}
                />
              ))}
            </div>
            </div>
          ))}

          <Button type="submit" text="Make Game" className="mt-8" disabled={!canMakeGame} />
        </form>
      </Card>
      {!!url && <Card>
          <p>Share this URL to play your game!</p>
          <p className="break-all mt-4">
              <a href={url} className="underline hover:text-emerald-800">{url}</a>
          </p>
      </Card>}
    </>
  );
}