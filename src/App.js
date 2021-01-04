/* eslint-disable no-restricted-globals */
import React from "react";
import { css, GlobalStyles } from "twin.macro";
import Board from "./components/Board";
import { GameProvider } from "./providers/GameProvider";
const OUTLINE = "sandybrown";
const OFFSET = "3px";

function App() {
  return (
    <GameProvider>
      <GlobalStyles />
      <div tw="min-h-screen  flex flex-col  justify-center  bg-gray-900 px-4">
        <h1 tw="flex flex-row items-center  text-white text-xl text-8xl font-extrabold mb-16">
          <span
            css={[
              css`
                text-shadow: -${OFFSET} -${OFFSET} 0 ${OUTLINE},
                  -${OFFSET} ${OFFSET} 0 ${OUTLINE},
                  ${OFFSET} -${OFFSET} 0 ${OUTLINE},
                  ${OFFSET} ${OFFSET} 0 ${OUTLINE};
              `,
            ]}
          >
            Jeopardy!
          </span>
          <div tw="text-3xl ml-12">
            <div>Web-dev</div>
            <div>edition</div>
          </div>
        </h1>
        <Board />
      </div>
    </GameProvider>
  );
}

export default App;
