import React from 'react';
import Matrix from '../Matrix';
import Info from '../Info'
export default class Board extends React.Component {
  render () {
    const { matrix, level, status } = this.props
    return (
      <div className="board">
        <Info level={ level }></Info>
        <div className="zone">
          <Matrix matrix={ matrix } status={ status }></Matrix>
        </div>
      </div>
    )
  }
}