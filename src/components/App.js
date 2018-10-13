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
  checkGameWin = (board) => {
    if (this.moveCount >= ((this.boardSize * 2) - 2)) { // Players can only win after a certain numer of moves
      // @TODO: check rows, columns, diagonals or game finished
      console.log('check rows, columns and diagonals');
    }

    this.nextPlayer();
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
