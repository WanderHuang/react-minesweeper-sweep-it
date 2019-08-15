import React from 'react';
import { connect } from 'react-redux';
import Row from '../Row';
class Matrix extends React.Component {
  render () {
    let { matrix } = this.props;
    const { level, mediaMatrix } = this.props;
    matrix = mediaMatrix || matrix;
    return (
      <div className="matrix" style={{fontSize: [18, 16, 14, 12][level] + 'px'}}>
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

// 从state中映射matrix到Matrix组件
const mapStateToProps = (state) => {
  return {
    mediaMatrix: state.mediaMatrix,
    matrix: state.matrix,
    level: state.level
  }
}

export default connect(mapStateToProps)(Matrix)
