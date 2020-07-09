import React from 'react';
import { useState, useEffect } from 'react';
// import styles from "./game.css";

// Hook
const useKeyPress = (targetKey, targetFunction) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = ({ key }) => {
    if (key === targetKey) {      
      // change direction or pause/start
      console.log(key);
      targetFunction(key);

      setKeyPressed(true);
    }
  }

  const upHandler = ({key}) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensure that effect is only run on mount and unmount

  return keyPressed;
}

const Game = ({changeDir, changeGameStatus}) => {
  const upPress = useKeyPress('w', changeDir);
  const downPress = useKeyPress('s', changeDir);
  const leftPress = useKeyPress('a', changeDir);
  const rightPress = useKeyPress('d', changeDir);
  const spacePress = useKeyPress(' ', changeGameStatus);

  return (
    <div>
        {upPress}
        {downPress}
        {leftPress}
        {rightPress}
        {spacePress}
    </div>
  );
}

export default Game;