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

    this.adjustCellSize(this.props.size);
  }

  // Adjust cells size based on the boardSize
  adjustCellSize = (boardSize) => {
    let css = `.cell { width: calc(80vw/${boardSize}); height:calc(80vw/${boardSize}) }`;
    const head = document.querySelector("head");
    const style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
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
      <div className={`board ${this.props.activePlayer}`}>
        {this.state.board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} position={`${rowIndex}-${cellIndex}`} onCellClick={this.handleCellClick}></Cell>
          ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Board;