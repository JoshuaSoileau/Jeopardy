/* eslint-disable no-restricted-globals */
import React from "react";
import { GlobalStyles } from "twin.macro";
import Board from "./components/Board";
import { GameProvider } from "./providers/GameProvider";

function App() {
  return (
    <GameProvider>
      <GlobalStyles />
      <div tw="min-h-screen  flex flex-col  items-center justify-center  bg-gray-900">
        <h1 tw="text-white text-xl">Web Dev Jeopardy!</h1>
        <Board />
      </div>
    </GameProvider>
  );
}

export default App;
