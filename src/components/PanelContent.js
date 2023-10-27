import React, { useState } from "react";
import useSound from "use-sound";

import { useGame } from "../providers/GameProvider";
import correctSound from "../sounds/correct.mp3";

import wrongSound from "../sounds/wrong.mp3";
import useKeypress from "../hooks/useKeypress";

const PanelContent = ({ close }) => {
  const [playCorrectSound] = useSound(correctSound);
  const correctKeypress = useKeypress("y", playCorrectSound);

  const [playWrongSound] = useSound(wrongSound);
  const wrongKeypress = useKeypress("n", playWrongSound);

  const { questions, activeCategory, activeNumber, markAnswered } = useGame();
  const [answerVisible, setAnswerVisible] = useState(false);

  const { question, answer, alreadyAnswered } =
    questions?.[activeCategory]?.[activeNumber] || {};

  return (
    <div className="flex flex-col items-center justify-between h-full  overflow-hidden">
      {/* TOP */}
      <div className="pt-12 flex flex-row justify-between w-full text-3xl">
        <span dangerouslySetInnerHTML={{ __html: activeCategory }} />
        <span>{activeNumber}</span>
      </div>

      {/* CENTER */}
      <div className="text-center">
        <p>{question}</p>
        <div className="mt-16">
          {answerVisible ? (
            answer
          ) : (
            <button
              type="button"
              className="underline"
              onClick={() => {
                setAnswerVisible(true);
              }}
            >
              Show answer
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="pb-12 flex flex-row justify-between w-full text-5xl">
        <button
          type="button"
          onClick={() => {
            setAnswerVisible(false);
            close();
          }}
        >
          &larr;
        </button>
        <div className="flex flex-col text-base">
          <button
            type="button"
            className={[
              "flex my-2 items-center",
              !correctKeypress && `opacity-20 hover:opacity-100`,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{}}
            onClick={playCorrectSound}
          >
            Press
            <div className="rounded-lg border border-white border-solid w-8 h-8  flex items-center justify-center  mx-4">
              Y
            </div>{" "}
            for correct
          </button>
          <button
            type="button"
            className={[
              "flex my-2 items-center",
              !wrongKeypress && `opacity-20 hover:opacity-100`,
            ]}
            onClick={playWrongSound}
          >
            Press
            <div className="rounded-lg border border-white border-solid w-8 h-8  flex items-center justify-center  mx-4">
              N
            </div>{" "}
            for wrong
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setAnswerVisible(false);
            markAnswered(activeCategory, activeNumber, !alreadyAnswered);
            close();
          }}
          style={{
            fontFamily: "system-ui",
          }}
        >
          {alreadyAnswered ? <span>&#8617;</span> : <span>&#10003;</span>}
        </button>
      </div>
    </div>
  );
};

export default PanelContent;
