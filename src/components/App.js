import React, { Component } from 'react';
import Board from './Board.js';
import '../css/App.css';

class App extends Component {
  constructor() {
    super()
    this.boardSize = 3;
    this.moveCount = 0;

    this.state = {
      activePlayer: 'cross', // cross is P1, circle is P2
    }
  }

  // Check game win condition
  checkGameWin = (board, playerMove) => {
    let x = Number(playerMove[0]);
    let y = Number(playerMove[1]);
    if (this.moveCount >= ((this.boardSize * 2) - 2)) { // Players can only win after a certain numer of moves
      // @TODO: check rows, columns, diagonals or game finished
      if (!this.checkRows(board, x)) {
        if (!this.checkColumns(board, y)) {
          if (!this.checkDiagonals(board, x, y)) {
            if (this.moveCount === ((this.boardSize * 2) - 1)) {
              alert('tie');
            }
          }
        }
      }
    }
    this.nextPlayer();
  }

  // Check rows for a match
  checkRows = (board, x) => {
    for (let i = 0; i < this.boardSize; i++) {
      if (board[x][i] !== this.state.activePlayer)
        break;
      if (i === this.boardSize - 1) {
        alert('win');
        return true;
      }
    }
    return false;
  }

  // Check columns for match
  checkColumns = (board, y) => {
    for (let j = 0; j < this.boardSize; j++) {
      if (board[j][y] !== this.state.activePlayer)
        break;
      if (j === this.boardSize - 1) {
        alert('win');
        return true;
      } 
    }
    return false;
  }

  // Check diagonals for a match
  checkDiagonals = (board, x, y) => {
    // Diagonal
    if (x === y) {
      for (let i = 0; i < this.boardSize; i++) {
        if (board[i][i] !== this.state.activePlayer)
          break;
        if (i === this.boardSize - 1) {
          alert('win');
          return true;
        } 
      }
    // Anti-diagonal
    } else if (x + y === this.boardSize - 1) { 
      for (let i = 0; i < this.boardSize; i++) {
        if (board[i][(this.boardSize-1-i)] !== this.state.activePlayer)
          break;
        if (i === this.boardSize - 1) {
          alert('win');
          return true;
        }
      }
    }
    return false;
  }

  // Turn moves to the other player
  nextPlayer = () => {
    if (this.state.activePlayer === 'cross') {
      this.setState({activePlayer: 'circle'});
    } else {
      this.setState({activePlayer: 'cross'});
    }

    this.moveCount++;
  }

  render() {
    return (
      <div className="App">
        <Board onCellClick={this.handleCellClick} activePlayer={this.state.activePlayer} checkGameWin={this.checkGameWin} size={this.boardSize}/>
      </div>
    );
  }
}

export default App;
