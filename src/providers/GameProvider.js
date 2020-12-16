import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Qs from "../questions/12-15.json";

const GameContext = React.createContext({
  questions: false,
  setQuestions: () => {},
});

export const GameProvider = ({ children }) => {
  const [questions, setQuestions] = useLocalStorage("questions", Qs);

  return (
    <GameContext.Provider value={{ questions, setQuestions }}>
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
