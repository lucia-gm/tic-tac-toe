import React, { Component } from 'react';
import Board from './Board.js';
import Modal from './Modal.js';
import * as Sound from '../sounds.js';
import '../css/App.css';

class App extends Component {
  constructor() {
    super()
    this.boardSize = 3;
    this.moveCount = 0;

    this.state = {
      activePlayer: 'cross', // cross is P1, circle is P2
      gameOver: false,
    }
  }

  // Check game win condition
  checkGameWin = (board, playerMove) => {
    let x = Number(playerMove[0]);
    let y = Number(playerMove[1]);
    
    // Check only when a player has enough moves to win
    if (this.moveCount >= ((this.boardSize * 2) - 2)) { 
      if (!this.checkRows(board, x)) {
        if (!this.checkColumns(board, y)) {
          if (!this.checkDiagonals(board, x, y)) {
            if (this.moveCount === (Math.pow(this.boardSize, 2) - 1)) {
              this.setState({gameOver: 'tie'});
            }
          }
        }
      }
    }

    // Turn for next player if game is not over
    if (!this.state.gameOver) {
      this.nextPlayer();      
    }
  }

  // Check rows for a match
  checkRows = (board, x) => {
    for (let i = 0; i < this.boardSize; i++) {
      if (board[x][i] !== this.state.activePlayer)
        break;
      if (i === this.boardSize - 1) {
        this.setState({gameOver: this.state.activePlayer})
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
        this.setState({gameOver: this.state.activePlayer})
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
          this.setState({gameOver: this.state.activePlayer})
          return true;
        } 
      }
    // Anti-diagonal
    } else if (x + y === this.boardSize - 1) { 
      for (let i = 0; i < this.boardSize; i++) {
        if (board[i][(this.boardSize-1-i)] !== this.state.activePlayer)
          break;
        if (i === this.boardSize - 1) {
          this.setState({gameOver: this.state.activePlayer})
          return true;
        }
      }
    }
    return false;
  }

  // Turn moves to the other player
  nextPlayer = () => {
    if (this.state.activePlayer === 'cross') {
      Sound.crossMove.play();
      this.setState({activePlayer: 'circle'});
    } else {
      Sound.circleMove.play();
      this.setState({activePlayer: 'cross'});
    }

    this.moveCount++;
  }

  render() {
    const { activePlayer, gameOver } = this.state;

    return (
      <div className="App">
         <Board onCellClick={this.handleCellClick} activePlayer={activePlayer} checkGameWin={this.checkGameWin} size={this.boardSize} /> 
        {gameOver && (
          <Modal activePlayer={activePlayer} winner={gameOver}/>
        )}
      </div>
    );
  }
}

export default App;
