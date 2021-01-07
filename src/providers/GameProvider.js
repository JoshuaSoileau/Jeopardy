import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// import Qs from "../questions/12-15.json";
import Qs from "../questions/1-7.json";

const GameContext = React.createContext({
  questions: false,
  setQuestions: () => {},
});

export const GameProvider = ({ children }) => {
  const [questions, setQuestions] = useLocalStorage("questions", Qs);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeNumber, setActiveNumber] = useState(0);
  const [activeButtonNumber, setActiveButtonNumber] = useState(0);

  const [players, setPlayers] = useLocalStorage("players", {
    Jim: 0,
    Bob: 0,
  });

  const correct = (name) => {
    if (!Object.hasOwnProperty.call(players, name)) return;

    setPlayers({
      ...players,
      [name]: Number(players[name]) + Number(activeNumber),
    });
  };

  const wrong = (name) => {
    if (!Object.hasOwnProperty.call(players, name)) return;

    setPlayers({
      ...players,
      [name]: players[name] - Number(activeNumber),
    });
  };

  const addPlayer = (player) => {
    setPlayers({
      ...players,
      [player]: 0,
    });
  };

  const removePlayer = (player) => {
    const { [player]: removedPlayer, ...remaining } = players;
    setPlayers(remaining);
  };

  const markAnswered = (category, value, answered) => {
    setQuestions({
      ...questions,
      [category]: {
        ...questions[category],
        [value]: {
          ...questions[category][value],
          alreadyAnswered: answered,
        },
      },
    });
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        setQuestions,
        markAnswered,

        activeCategory,
        setActiveCategory,

        activeNumber,
        setActiveNumber,

        activeButtonNumber,
        setActiveButtonNumber,

        players,
        correct,
        wrong,
        addPlayer,
        removePlayer,
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
