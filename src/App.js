/* eslint-disable no-restricted-globals */
import React from "react";
import Board from "./components/Board";
import { GameProvider } from "./providers/GameProvider";

import "./tailwind.css";

function App() {
  return (
    <GameProvider>
      <div
        className="min-h-screen  flex flex-col  justify-center  bg-gray-900 px-4"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre-v2.png")`,
        }}
      >
        <div className="w-full max-w-12xl mx-auto">
          <h1 className="flex flex-row items-center  text-white text-6xl font-bold mb-8">
            <span className="ml-8">Web Dev Jeopardy!</span>
          </h1>
          <Board />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
