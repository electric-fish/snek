export const snekFunctions = {

  checkBoundary: () => {
  },

  checkSnake: () => {

  },

  checkApple: () => {

  },

  iterateSnek: (snakeData, appleData, currDir, boardLen) => {
    let snakeHead = [snakeData[0][0], snakeData[0][1]];
    switch(currDir) {
      case 0: //right
        snakeHead[1]++;
        break;
      case 1: //down
        snakeHead[0]++;
        break;
      case 2: //left
        snakeHead[1]--;
        break;
      case 3: //up
        snakeHead[0]--;
        break;
      default:
        console.log("ITERATE SNEK ERROR");
        break;
    }

    snekFunctions.checkSnake(snakeHead, snakeData);
    snekFunctions.checkApple();
    snekFunctions.checkBoundary();

    return 1;
  },

  spawnApple: (snakeData, appleData, boardLen) => {
    return [5,5];
  }

}