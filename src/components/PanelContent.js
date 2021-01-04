import React, { useState } from "react";
import { css } from "twin.macro";
import { useGame } from "../providers/GameProvider";

const PanelContent = ({ close }) => {
  const { questions, activeCategory, activeNumber, markAnswered } = useGame();
  const [answerVisible, setAnswerVisible] = useState(false);

  const { question, answer, alreadyAnswered } =
    questions?.[activeCategory]?.[activeNumber] || {};

  return (
    <div tw="flex flex-col items-center justify-between h-full">
      {/* TOP */}
      <div tw="pt-12 flex flex-row justify-between w-full text-3xl">
        <span>{activeCategory}</span>
        <span>{activeNumber}</span>
      </div>

      {/* CENTER */}
      <div tw="text-center">
        <p>{question}</p>
        <div tw="mt-16">
          {answerVisible ? (
            answer
          ) : (
            <button
              type="button"
              tw="underline"
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
      <div tw="pb-12 flex flex-row justify-between w-full text-5xl">
        <button
          type="button"
          onClick={() => {
            setAnswerVisible(false);
            close();
          }}
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswerVisible(false);
            markAnswered(activeCategory, activeNumber, !alreadyAnswered);
            close();
          }}
          css={[
            css`
              & {
                font-family: system-ui;
              }
            `,
          ]}
        >
          {alreadyAnswered ? <span>&#8617;</span> : <span>&#10003;</span>}
        </button>
      </div>
    </div>
  );
};

export default PanelContent;
