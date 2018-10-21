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
  handleCellClick = (event, position) => {
    event.preventDefault();

    // Update cell and check game win condition
    let playerMove = this.updateCellValue(position);
    if (playerMove) {
      this.props.checkGameWin(this.state.board, playerMove);
    };
  }

  // Sets value on the clicked cell
  updateCellValue = (position) => {
    let [ x, y ] = position.split('-');
    let newBoard = this.state.board;
    newBoard[x][y] = this.props.activePlayer;
    this.setState({board: newBoard});
    
    return [ x, y ];
  }

  render() {
    return (
      <div className={`board ${this.props.activePlayer}`}>
        {this.state.board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} position={`${rowIndex}-${cellIndex}`} onCellClick={!cell ? this.handleCellClick : undefined} cellClass={cell}></Cell>
          ))}
          </div>
        ))}
      </div>
    )
  }
}

export default Board;