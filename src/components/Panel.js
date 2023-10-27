import React from "react";
import { useGame } from "../providers/GameProvider";
import PanelContent from "./PanelContent";

const Panel = ({ panelStyle = {}, close = () => {} }) => {
  const { questions, activeNumber, activeCategory } = useGame();

  const { alreadyAnswered } = questions?.[activeCategory]?.[activeNumber] || {};

  return (
    <div
      className="panel absolute transition-all ease-in-out overflow-hidden inset-0"
      style={{
        perspective: "1000px",
        pointerEvents: !activeNumber ? "none" : "auto",
      }}
    >
      <div className="relative h-full" style={panelStyle}>
        {/* FRONT */}
        <div
          className="front absolute top-0 left-0  h-full w-full flex items-center justify-center   transition-all ease-in-out  min-h-40  px-16  text-center  bg-blue-700  text-yellow-300 text-4xl break-words"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {!alreadyAnswered ? activeNumber : ""}
        </div>

        {/* BACK */}
        <div
          className="back absolute top-0 left-0  h-full w-full bg-blue-700 transition-all ease-in-out    text-white text-4xl px-12   font-serif"
          style={{ backfaceVisibility: "hidden" }}
        >
          <PanelContent close={close} />
        </div>
      </div>
    </div>
  );
};

export default Panel;
