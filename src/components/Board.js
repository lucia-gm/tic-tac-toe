import React, { Component } from 'react';
import Cell from './Cell.js';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [],
    }

    // Starting board
    for (let i = 0; i < this.props.size; i++) {
      let row = [];
      for (let j = 0; j < this.props.size; j++) {
        row.push(0);
      }
      this.state.board.push(row);
    }
  }

  // Handle players move
  handleCellClick = (event) => {
    event.preventDefault();
    let eventCell = event.target;
    eventCell.position = eventCell.getAttribute('position');

    // Update cell and check game win condition
    let playerMove = this.updateCellValue(eventCell.position);
    if (playerMove) {
      eventCell.classList.add(this.props.activePlayer);
      this.props.checkGameWin(this.state.board, playerMove);
    };
  }

  // Sets value on the clicked cell
  updateCellValue = (position) => {
    let values = position.split('-');
    if (values.length === 2) {
      if (this.state.board[values[0]][values[1]] === 0) {
        let newBoard = this.state.board;
        newBoard[values[0]][values[1]] = this.props.activePlayer;
        this.setState({board: newBoard});
        return values;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, rowIndex) => 
          row.map((cell, cellIndex) => (
            <Cell key={cellIndex} position={`${rowIndex}-${cellIndex}`} onCellClick={this.handleCellClick}></Cell>
          ))
        )}
      </div>
    )
  }
}

export default Board;