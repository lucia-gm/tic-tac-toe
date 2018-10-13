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

  render() {
    
    console.log(this.state.board);

    return (
      <div className="board">
        {this.state.board.map((row, rowIndex) => 
          row.map((cellIndex) => (
            <Cell key={cellIndex} position={`${rowIndex}-${cellIndex}`} onCellClick={this.props.onCellClick}></Cell>
          ))
        )}
      </div>
    )
  }
}

export default Board;