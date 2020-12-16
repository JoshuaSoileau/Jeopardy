import React, { useRef, useState } from "react";
import { useGame } from "../providers/GameProvider";
import tw, { css } from "twin.macro";

const Board = () => {
  const questionButtons = useRef(new Array(99));
  const gridRef = useRef(null);
  const { questions } = useGame();
  const [panelStyle, setPanelStyle] = useState({
    top: 0,
    left: 0,
    width: "0",
    height: "0",
  });
  const [activeCategory, setActiveCategory] = useState("");
  const [activeNumber, setActiveNumber] = useState("");
  const [activeButtonNumber, setActiveButtonNumber] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);

  const categories = Object.keys(questions);

  const shiftToLocation = ({ target, duration = 0, ...additional }) => {
    const top = target.offsetTop;
    const left = target.offsetLeft;
    const { width, height } = target.getBoundingClientRect();

    setPanelStyle({
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      transitionDuration: `${duration}ms`,
      transformStyle: "preserve-3d",
      ...additional,
    });
  };

  const openPanelFrom = (target) => {
    shiftToLocation({
      target,
      transform: "rotateY(180deg)",
      opacity: 1,
      pointerEvents: "initial",
    });

    setTimeout(() => {
      shiftToLocation({
        target: gridRef.current,
        duration: 1000,
        opacity: 1,
        pointerEvents: "initial",
      });
    }, 500);
  };

  const closePanelTo = (target) => {
    shiftToLocation({
      target,
      duration: 1000,
      transform: "rotateY(180deg)",
      opacity: 1,
      pointerEvents: "none",
    });

    setTimeout(() => {
      shiftToLocation({
        target,
        transform: "rotateY(180deg)",
        duration: 0,
        opacity: 0,
        pointerEvents: "none",
      });
    }, 1000 + 100);
  };

  return (
    <div tw="relative">
      <ul
        tw="grid grid-cols-5 gap-2  list-none  m-0 p-0 max-w-5xl"
        ref={gridRef}
      >
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => {}}
              tw="flex items-center justify-center  w-full h-full min-h-48  px-16  text-center  bg-blue-600  text-white text-4xl break-words"
            >
              {category}
            </button>
          </li>
        ))}

        {Object.entries(questions).map(([category, data], columnIndex) => {
          return Object.entries(data).map(
            ([number, questionObject], rowIndex) => {
              const gridNumber = columnIndex * 5 + rowIndex;
              const { question } = questionObject;

              return (
                <li key={question}>
                  <button
                    ref={(el) => (questionButtons.current[gridNumber] = el)}
                    type="button"
                    tw="flex items-center justify-center  w-full h-full min-h-48  px-16  text-center  bg-blue-600  text-yellow-200 text-4xl break-words"
                    onClick={() => {
                      setAnswerVisible(false);
                      setActiveNumber(number);
                      setActiveCategory(category);
                      setActiveButtonNumber(gridNumber);
                      openPanelFrom(questionButtons.current[gridNumber]);
                    }}
                  >
                    {number}
                  </button>
                </li>
              );
            }
          );
        })}
      </ul>
      <div
        className="panel"
        css={[
          tw`absolute transition-all ease-in-out overflow-hidden`,
          css`
            transform-style: preserve-3d;
            perspective: 1000px;
          `,
        ]}
        style={panelStyle}
      >
        <div tw="relative h-full">
          <div
            className="front"
            css={[
              tw`absolute top-0 left-0  h-full w-full flex items-center justify-center   transition-all ease-in-out  bg-blue-600  text-yellow-400 font-bold text-4xl break-words`,
              css`
                transform: rotateY(180deg);
                backface-visibility: hidden;
              `,
            ]}
          >
            {activeNumber}
          </div>
          <div
            className="back"
            css={[
              tw`absolute top-0 left-0  h-full w-full flex flex-col items-center justify-center  bg-blue-600 transition-all ease-in-out    text-white text-4xl px-12`,
              css`
                backface-visibility: hidden;
              `,
            ]}
          >
            <button
              type="button"
              onClick={() => {
                const buttonRef = questionButtons.current[activeButtonNumber];
                closePanelTo(buttonRef);
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
    </div>
  );
};

export default Board;
