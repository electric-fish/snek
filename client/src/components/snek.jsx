import React from 'react';
import styles from "./snek.css";

import Game from "./game.jsx";
import Board from "./board.jsx";

import { snekFunctions } from "./snekFunctions.jsx";

class Snek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeData: [[0,3], [0,2], [0,1], [0,0]],
      appleData: [0,6],
      currDir: 0, //0: right, 1: down, 2: left, 3: up
      gameStatus: 0, //0: stop, 1: start, 2: gameover
      boardLen: 20,
      score: 0
    }
    this.resetGame = this.resetGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.runGame = this.runGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.updateSnake = this.updateSnake.bind(this);
    this.changeDir = this.changeDir.bind(this);
    this.changeGameStatus = this.changeGameStatus.bind(this);
  }

  resetGame() {
    this.setState({
      snakeData: [[0,3], [0,2], [0,1], [0,0]],
      appleData: [0,6],
      currDir: 0, //0: right, 1: down, 2: left, 3: up
      gameStatus: 0, //0: stop, 1: start, 2: gameover
      score: 0
    });
  }

  startGame() {
    if (this.state.gameStatus == 2) {
      this.resetGame();
    }
    this.setState({
      gameStatus: 1
    });
    this.cooldown = setInterval(this.runGame, 200);
  }

  pauseGame() {
    this.setState({
      gameStatus: 0
    });
    clearInterval(this.cooldown);
  }

  updateSnake(newSnakeData) {
    this.setState({
      snakeData: newSnakeData
    });
  }

  runGame() {
    switch( snekFunctions.iterateSnek(this.state.snakeData, this.state.appleData, this.state.currDir, this.state.boardLen, this.updateSnake) ) {
      case 0: //nothing happens
        break;
      case 1: // ate apple, spawn new apple
        this.setState({
          appleData: snekFunctions.spawnApple(this.state.snakeData, this.state.boardLen),
          score: this.state.score + 1
        });
        break;
      case 2: //game over
        clearInterval(this.cooldown);
        this.setState({
          gameStatus: 2
        });
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

  changeDir(newDir) {
    // console.log(newDir);
    switch (newDir) {  //0: right, 1: down, 2: left, 3: up
      case 'w': // up
        this.setState({
          currDir: 3
        });
        break;
      case 'a': // left
        this.setState({
          currDir: 2
        });
        break;
      case 's': // down
        this.setState({
          currDir: 1
        });
        break;
      case 'd': // right
        this.setState({
          currDir: 0
        });
        break;
      default:
        break;
    }
  }

  changeGameStatus() {
    switch (this.state.gameStatus) {
      case 0:
        this.startGame();
        break;
      case 1:
        this.pauseGame();
        break;
      case 2:
        this.startGame();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className={styles.global}>
        <h1 className={styles.header}>Snek</h1>
        <Game changeDir={this.changeDir} changeGameStatus={this.changeGameStatus} />
        <Board snakeData={this.state.snakeData} appleData={this.state.appleData} boardLen={this.state.boardLen} />
        <div>
          [Instructions]<br />
          w: up |  a: left | s: down | d: right<br />
          space: start/pause/restart<br />
        </div><p />
        <div>Score: {this.state.score}</div>
      </div>
    );
  }
}

export default Snek;