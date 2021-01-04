import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Qs from "../questions/12-15.json";

const GameContext = React.createContext({
  questions: false,
  setQuestions: () => {},
});

export const GameProvider = ({ children }) => {
  const [questions, setQuestions] = useLocalStorage("questions", Qs);
  const [activeCategory, setActiveCategory] = useLocalStorage(
    "activeCategory",
    ""
  );
  const [activeNumber, setActiveNumber] = useLocalStorage("activeNumber", 0);
  const [activeButtonNumber, setActiveButtonNumber] = useLocalStorage(
    "activeButtonNumber",
    0
  );

  return (
    <GameContext.Provider
      value={{
        questions,
        setQuestions,

        activeCategory,
        setActiveCategory,

        activeNumber,
        setActiveNumber,

        activeButtonNumber,
        setActiveButtonNumber,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined || context === null) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
