import React from 'react';
import styles from "./game.css";

import Board from "./board.jsx";

const Game = ({snakeData, appleData, currDir, gameStatus, boardLen}) => {
  return (
    <div>
        <Board snakeData={snakeData} appleData={appleData} boardLen={boardLen} />
    </div>
  );
}

export default Game;