import React from 'react';
import styles from "./board.css";

const BoardBlock = ({data}) => {
  if (data === 0) {
    return (
      <div className={styles.board_block_0}></div>
    );
  } else if (data === 1) {
    return (
      <div className={styles.board_block_1}></div>
    );
  } else {
    return (
      <div className={styles.board_block_2}></div>
    );
  }
}

const BoardRow = ({boardRowData}) => {
  const boardRowItems = boardRowData.map((item) => {
    return (
      <BoardBlock data={item} />
    );
  });

  return (
    <div className={styles.board_container}>
      {boardRowItems}
    </div>
  );
}

const Board = ({snakeData, appleData, boardLen}) => {
  //make board
  let boardData = new Array(boardLen);
  for (var i = 0; i < boardLen; i++) {
    boardData[i] = new Array(boardLen);
    boardData[i].fill(0, 0, boardLen);
  }
  for (var i = 0; i < snakeData.length; i++) {
    boardData[snakeData[i][0]][snakeData[i][1]] = 1;
  }
  boardData[appleData[0]][appleData[1]] = 2;
  // console.log(boardData);
  
  //print board
  const boardItems = boardData.map((data) => {
    return (
      <div>
        <BoardRow boardRowData={data} />
      </div>
    );
  });

  
  return (
    <div>
        {boardItems}
        <br />
    </div>
  );
}

export default Board;