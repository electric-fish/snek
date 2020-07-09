export const snekFunctions = {

  checkBoundary: (checkHead, boardLen) => {
    if (checkHead[0] < 0 || checkHead[0] >= boardLen || checkHead[1] < 0 || checkHead[1] >= boardLen) {
      return 1;
    }
    return 0;
  },

  checkSnake: (checkHead, snakeData) => {
    for (var i = 0; i < snakeData.length; i++) {
        if (snakeData[i][0] === checkHead[0] && snakeData[i][1] === checkHead[1]) {
          return 1;
        }
    }
    return 0;
  },

  checkApple: (checkHead, appleData) => {
    if (checkHead[0] === appleData[0] && checkHead[1] === appleData[1]) {
      return 1;
    }
    return 0;
  },

  iterateSnek: (snakeData, appleData, currDir, boardLen, updateSnake) => {
    // console.log(snakeData);
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

    if (snekFunctions.checkBoundary(snakeHead, boardLen) === 1) {
      return 2;
    }

    if (snekFunctions.checkSnake(snakeHead, snakeData) === 1) {
      return 2;
    }

    if (snekFunctions.checkApple(snakeHead, appleData) === 1) {
      // update snake to include apple
      snakeData.unshift(snakeHead);
      return 1;
    } else {
      // update snake to move
      snakeData.pop();
      snakeData.unshift(snakeHead);
      updateSnake(snakeData);
    }

    return 0;
  },

  spawnApple: (snakeData, boardLen) => {

    console.log(boardLen)
    let newApple = [];
    newApple.push(Math.floor(Math.random() * boardLen));
    newApple.push(Math.floor(Math.random() * boardLen));
    console.log(newApple);

    while (snekFunctions.checkBoundary(newApple, boardLen) === 1 || snekFunctions.checkSnake(newApple, snakeData) === 1) {
      newApple[0] = Math.floor(Math.random() * boardLen);
      newApple[1] = Math.floor(Math.random() * boardLen);
    }

    console.log(newApple);
    return newApple;
  }

}