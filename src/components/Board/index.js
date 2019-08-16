import React from 'react';
import Matrix from '../Matrix';
import Info from '../Info';
import Description from '../Description';
export default class Board extends React.Component {
  render () {
    return (
      <div className="board">
        <Info></Info>
        <div className="zone">
          <Matrix />
        </div>
        <Description />
      </div>
    )
  }
}