import React from 'react';

const Cell = (props) => (
  <div className="cell" onClick={props.onCellClick} position={props.position}></div>
)

export default Cell;