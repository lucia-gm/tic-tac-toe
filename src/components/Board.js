import React, { Component } from 'react';
import Cell from './Cell.js';

class Board extends Component {
  constructor() {
    super()
    this.state = {
      boardCells: [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]],
    }
  }

  render() {
    return (
      <div className="board">
        {this.state.boardCells.map(boardCell => (
          <Cell key={boardCell} position={boardCell} onCellClick={this.props.onCellClick}></Cell>
        ))}
      </div>
    )
  }
}

export default Board;