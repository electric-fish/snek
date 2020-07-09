import React from 'react';
import styles from "./snek.css";

import Game from "./game.jsx";

import { snekFunctions } from "./snekFunctions.jsx";

class Snek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeData: [[0,3], [0,2], [0,1], [0,0]],
      appleData: [0,6],
      currDir: 0, //0: right, 1: down, 2: left, 3: up
      gameStatus: 0, //0: stop, 1: start, 2: gameover
      boardLen: 20
    }
    this.resetGame = this.resetGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.runGame = this.runGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.updateSnake = this.updateSnake.bind(this);
  }

  resetGame() {
    this.setState({
      snakeData: [[0,3], [0,2], [0,1], [0,0]],
      appleData: [0,6],
      currDir: 0, //0: right, 1: down, 2: left, 3: up
      gameStatus: 0 //0: stop, 1: start, 2: gameover
    });
  }

  startGame() {
    if (this.state.gameStatus == 2) {
      this.resetGame();
    }
    this.setState({
      gameStatus: 1
    });
    this.cooldown = setInterval(this.runGame, 600);
  }

  pauseGame() {
    clearInterval(this.cooldown);
  }

  updateSnake(newSnakeData) {
    console.log('update snake:'+  newSnakeData);
    this.setState({
      snakeData: newSnakeData
    });
  }

  runGame() {
    switch( snekFunctions.iterateSnek(this.state.snakeData, this.state.appleData, this.state.currDir, this.state.boardLen, this.updateSnake) ) {
      case 0: //nothing happens
        console.log('0');
        break;
      case 1: // ate apple, spawn new apple
        console.log('1');
        this.setState({
          appleData: snekFunctions.spawnApple(this.state.snakeData, this.state.boardLen)
        });
        break;
      case 2: //game over
        console.log('2');
        this.pauseGame();
        break;
      default: //error
        console.log('RUN GAME ERROR');
        break;
    }
  }

  componentDidMount() {
    this.resetGame();
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.cooldown);
  }

  render() {
    return (
      <div className={styles.global}>
        <h1 className={styles.header}>Snek</h1>
        <Game snakeData={this.state.snakeData} appleData={this.state.appleData} currDir={this.state.currDir} gameStatus={this.state.gameStatus} boardLen={this.state.boardLen} />
      </div>
    );
  }
}

export default Snek;