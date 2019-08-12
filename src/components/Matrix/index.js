import React from 'react';
import Row from '../Row';
export default class Matrix extends React.Component {
  render () {
    const { matrix } = this.props
    return (
      <div className="matrix">
        {
          matrix.map((row, index) => {
            return (
              <Row row={ row } key={ index }></Row>
            )
          })
        }
      </div>
    )
  }
}
