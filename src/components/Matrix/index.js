import React from 'react';
import { connect } from 'react-redux';
import Row from '../Row';
class Matrix extends React.Component {
  render () {
    const { matrix } = this.props;
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

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Matrix)
