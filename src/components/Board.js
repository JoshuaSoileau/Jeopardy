import React, { useRef, useState } from "react";
import { useGame } from "../providers/GameProvider";
import Panel from "./Panel";
import PlayerList from "./PlayerList";

const OPEN_TIMING = 500;
const CLOSE_TIMING = 1000 + 100;

const Board = () => {
  const questionButtons = useRef(new Array(99));
  const gridRef = useRef(null);
  const {
    questions,

    setActiveCategory,
    setActiveNumber,

    activeButtonNumber,
    setActiveButtonNumber,
  } = useGame();
  const [panelStyle, setPanelStyle] = useState({
    top: 0,
    left: 0,
    width: "0",
    height: "0",
    transformStyle: "preserve-3d",
    transform: "rotateY(180deg)",
  });

  const CATEGORIES = Object.keys(questions);
  const QUESTIONS_PER_CATEGORY = Object.keys(questions[CATEGORIES[0]]).length;
  const VALUES = [...Array(QUESTIONS_PER_CATEGORY)].map((_, index) =>
    String(index * 100 + 100)
  );

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
    }, OPEN_TIMING);
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
    }, CLOSE_TIMING);
  };

  return (
    <div className="relative w-auto flex flex-row items-center">
      <ul
        className={[
          "grid gap-2  list-none  m-0 p-0 max-w-5xl",
          CATEGORIES?.length === 3 && "grid-cols-3",
          CATEGORIES?.length === 4 && "grid-cols-4",
          CATEGORIES?.length === 5 && "grid-cols-5",
        ]
          .filter(Boolean)
          .join(" ")}
        ref={gridRef}
      >
        {/* Titles */}
        {CATEGORIES.map((category) => (
          <li key={category}>
            <div
              className="flex items-center justify-center  w-full h-full min-h-40  px-16  text-center  bg-blue-700  text-white text-3xl break-words"
              dangerouslySetInnerHTML={{ __html: category }}
            ></div>
          </li>
        ))}

        {VALUES.map((value, rowIndex) =>
          CATEGORIES.map((category, columnIndex) => {
            const gridNumber = columnIndex * 5 + rowIndex;
            const { question, alreadyAnswered } =
              questions?.[category]?.[value] || {};

            return (
              <li key={question} data-category={category} data-value={value}>
                <button
                  ref={(el) => (questionButtons.current[gridNumber] = el)}
                  type="button"
                  className="flex items-center justify-center  w-full h-full min-h-40  px-16  text-center  bg-blue-700  text-yellow-300 text-4xl break-words"
                  onClick={() => {
                    setActiveNumber(value);
                    setActiveCategory(category);
                    setActiveButtonNumber(gridNumber);
                    openPanelFrom(questionButtons.current[gridNumber]);
                  }}
                >
                  {!alreadyAnswered && Boolean(question) ? value : ""}
                </button>
              </li>
            );
          })
        )}
        <Panel
          panelStyle={panelStyle}
          close={() => {
            const buttonRef = questionButtons.current[activeButtonNumber];
            closePanelTo(buttonRef);

            setTimeout(() => setActiveNumber(0), CLOSE_TIMING);
          }}
        />
      </ul>
      <PlayerList />
    </div>
  );
};

export default Board;
