import React, { useState } from "react";
import tw, { css } from "twin.macro";
import { useGame } from "../providers/GameProvider";

const Panel = ({
  activeNumber = "",
  activeCategory = "",
  panelStyle = {},
  close = () => {},
}) => {
  const { questions } = useGame();
  const [answerVisible, setAnswerVisible] = useState(false);

  return (
    <div
      className="panel"
      css={[
        tw`absolute transition-all ease-in-out overflow-hidden font-serif`,
        css`
          & {
            transform-style: preserve-3d;
            perspective: 1000px;
          }
        `,
      ]}
      style={panelStyle}
    >
      <div tw="relative h-full">
        {/* FRONT */}
        <div
          className="front"
          css={[
            tw`absolute top-0 left-0  h-full w-full flex items-center justify-center   transition-all ease-in-out  bg-blue-800  text-yellow-400 font-bold text-4xl break-words`,
            css`
              & {
                transform: rotateY(180deg);
                backface-visibility: hidden;
              }
            `,
          ]}
        >
          {activeNumber}
        </div>

        {/* BACK */}
        <div
          className="back"
          css={[
            tw`absolute top-0 left-0  h-full w-full flex flex-col items-center justify-center  bg-blue-800 transition-all ease-in-out    text-white text-4xl px-12`,
            css`
              & {
                backface-visibility: hidden;
              }
            `,
          ]}
        >
          <button
            type="button"
            onClick={() => {
              setAnswerVisible(false);
              close();
            }}
          >
            {questions?.[activeCategory]?.[activeNumber]?.question}
          </button>
          <div tw="mt-16">
            {answerVisible ? (
              questions?.[activeCategory]?.[activeNumber]?.answer
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
      </div>
    </div>
  );
};

export default Panel;
