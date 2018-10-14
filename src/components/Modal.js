import React, { Component} from 'react';

class Modal extends Component {
  refreshPage = () => {
    window.location.reload(true);
  }

  render() {
    const { winner } = this.props
    return (
      <div className="modal">
        <div className="modal-content">
          {winner !== 'tie' && (
            <h2 className="modal-message">Player <span>{winner}</span> won… Congratulations!</h2>
          )} 
          {winner === 'tie' && (
            <h2 className="modal-message">It's a tie!</h2>
          )}
          <button className="play-button" onClick={this.refreshPage}>Play again</button>
        </div>
      </div>
    )
  }
}

export default Modal;