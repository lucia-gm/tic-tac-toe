import React from 'react';

const Cell = (props) => (
  <div className={`cell ${props.cellClass}`} onClick={!props.onCellClick ? undefined : event => props.onCellClick(event,props.position)}></div>
)

export default Cell;