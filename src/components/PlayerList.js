import React from "react";
import "twin.macro";
import { useGame } from "../providers/GameProvider";

const SCORE_COLOR = {
  "-1": "red",
  0: "white",
  1: "lightgreen",
};

const PlayerList = () => {
  const { players, correct, wrong, addPlayer, removePlayer } = useGame();

  if (!Object.keys(players)) return "";

  return (
    <ul className="group" tw="ml-16">
      {Object.entries(players).map(([name, score]) => {
        const sign = Math.sign(Number(score));

        return (
          <li
            key={name}
            className="group"
            tw="text-4xl  flex flex-row items-center  rounded-lg  p-4 px-12 pr-20  transition-all  hover:(bg-white bg-opacity-10)  relative"
          >
            <div tw="absolute left-4 top-1/2 flex flex-col justify-center text-white transform -translate-y-1/2 text-center">
              <button
                onClick={() => {
                  console.log("correct");
                  correct(name);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  console.log("wrong");
                  wrong(name);
                }}
              >
                -
              </button>
            </div>
            <div tw="rounded-full bg-gradient-to-r from-green-500 to-purple-400 text-gray-900 flex items-center justify-center w-24 h-24 mr-12  font-bold  text-5xl  ring-4 ring-white  border border-4 border-gray-900">
              {name[0]}
            </div>
            <div>
              <div tw="font-serif text-white">{name}</div>
              <div
                tw="text-3xl  font-bold"
                style={{
                  color: SCORE_COLOR[sign],
                }}
              >
                {score}
              </div>
            </div>
            <button
              type="button"
              tw="absolute top-2 right-4  text-lg text-white opacity-0 transition-all group-hover:opacity-100"
              style={{ filter: "brightness(4.5)" }}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                const definitely = confirm(
                  "Are you sure you want to delete this person?"
                );
                if (!definitely) return;

                removePlayer(name);
              }}
            >
              ✖
            </button>
          </li>
        );
      })}
      <li
        className="group"
        tw="text-4xl  flex flex-row items-center  rounded-lg  p-4 px-12  transition-all  hover:(bg-white bg-opacity-10 opacity-100)  relative  opacity-0 group-hover:(opacity-10) group-hover:hover:(opacity-100)  text-center"
      >
        <button
          type="button"
          tw="text-white"
          onClick={() => {
            const newPlayer = prompt("What is the new person's name?");
            if (!newPlayer) return;

            addPlayer(newPlayer);
          }}
        >
          + Add Player
        </button>
      </li>
    </ul>
  );
};

export default PlayerList;
