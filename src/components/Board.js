import React, { useRef, useState } from "react";
import { useGame } from "../providers/GameProvider";
import "twin.macro";
import Panel from "./Panel";

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
        {/* Titles */}
        {categories.map((category) => (
          <li key={category}>
            <div tw="flex items-center justify-center  w-full h-full min-h-48  px-16  text-center  bg-blue-800  text-white text-4xl break-words">
              {category}
            </div>
          </li>
        ))}

        {/* Columns */}
        {Object.entries(questions).map(([category, data], columnIndex) => {
          return Object.entries(data).map(
            ([number, questionObject], rowIndex) => {
              const gridNumber = columnIndex * 5 + rowIndex;
              const { question } = questionObject;

              return (
                <li key={question} data-category={category} data-value={number}>
                  <button
                    ref={(el) => (questionButtons.current[gridNumber] = el)}
                    type="button"
                    tw="flex items-center justify-center  w-full h-full min-h-48  px-16  text-center  bg-blue-800  text-yellow-300 text-4xl break-words"
                    onClick={() => {
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
      <Panel
        activeNumber={activeNumber}
        activeCategory={activeCategory}
        panelStyle={panelStyle}
        close={() => {
          const buttonRef = questionButtons.current[activeButtonNumber];
          closePanelTo(buttonRef);
        }}
      />
    </div>
  );
};

export default Board;
