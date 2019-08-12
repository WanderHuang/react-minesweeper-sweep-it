import React from 'react';
import Cell from '../Cell';
export default class Row extends React.Component {
  render () {
    const { row } = this.props;
    return (
      <div className="row">
        {
          row.map((cell, index) => {
            return (
              <Cell cell={ cell } key={ index }></Cell>
            )
          })
        }
      </div>
    )
  }
}
