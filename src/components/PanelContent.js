import React, { useState } from "react";
import { css } from "twin.macro";
import { useGame } from "../providers/GameProvider";

const PanelContent = ({ close }) => {
  const { questions, activeCategory, activeNumber } = useGame();
  const [answerVisible, setAnswerVisible] = useState(false);

  const question = questions?.[activeCategory]?.[activeNumber]?.question;
  const answer = questions?.[activeCategory]?.[activeNumber]?.answer;

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
          &#10003;
        </button>
      </div>
    </div>
  );
};

export default PanelContent;
