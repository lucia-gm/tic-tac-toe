import React, { Component } from 'react';
import Board from './Board.js';
import '../css/App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      turn: 'playerX',
      tokensX: 3,
      tokensO: 3,
      cellsX: [],
      cellsO: [],
    }
  }

  handleCellClick = (event) => {
    event.preventDefault();
    let cell = event.target;
    cell.position = cell.getAttribute('position');

    if (cell.classList.contains('circle') || cell.classList.contains('cross')) {
      alert('Please choose an empty cell');
    } else {
      if (this.state.turn === 'playerX') {
        cell.classList.add('cross');
        let updatedTokensX = this.state.tokensX - 1;

        if (updatedTokensX === 0) {
          this.handleEndGame(cell.position, this.state.cellsX)
        }

        this.state.cellsX.push(cell.position)
        this.setState({turn: 'playerO',
                       tokensX: updatedTokensX
                     })
      } else {
        cell.classList.add('circle');
        let updatedTokensO = this.state.tokensO - 1;

        if (updatedTokensO === 0) {
          this.handleEndGame(cell.position, this.state.cellsO)
        }

        this.state.cellsO.push(cell.position)
        this.setState({turn: 'playerX',
                      tokensO: updatedTokensO
                    })
      }
    }
  }

  
  handleEndGame = (cellClicked, cell) => {
    // TODO check conditions for the target column, row and both diagonals 
    // This was my first atempt and will need to check a better algorithm to solve it
    if (cellClicked[0] === cell[0][0] && cellClicked[0] === cell[1][0]) {
      alert('win');
    } else if (cellClicked[1] === cell[0][1] && cellClicked[1] === cell[1][1]) {
      alert('win');
    } else if (cellClicked[0] === cellClicked[1] && cell[0][0] === cell[0][1] && cell[1][0] === cell[1][1]) {
      alert('win');
    } else {
      alert('tie');
    }
  }

  render() {
    return (
      <div className="App">
        <Board onCellClick={this.handleCellClick}/>
      </div>
    );
  }
}

export default App;
