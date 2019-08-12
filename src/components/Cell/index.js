import React from 'react';
import { connect } from 'react-redux';
import { CellTypes, traverseMatrix, mapLevel } from '../../util';
import { changeMatrix, changeStatus } from '../../store/actions';

class Cell extends React.Component {

  renderCellContent (cell) {
    const { status, isMine, value } = cell
    switch (status) {
      case CellTypes.CELL_NOT_REVEAL:
        return (
          <div className="block"></div>
        );
      case CellTypes.CELL_NULL:
        return (
          <div className="revealed-block"></div>
        );
      case CellTypes.CELL_NUMBER:
        return (
          <div className="revealed-block">{value}</div>
        );
      case CellTypes.CELL_MINE:
        return (
          <div className="revealed-block">{isMine ? <span role="img" aria-label="flag">💣</span> : ''}</div>
        );
      case CellTypes.CELL_FLAG:
        return (
          <div className="block">
            <span role="img" aria-label="flag">⛳</span>
          </div>
        );
      default:
        return <div></div>
    }
  }

  _reveal (event) {
    event.preventDefault();
    const { blockRevealed, cell, matrix, level } = this.props;
    blockRevealed(cell, matrix, level);
  }
  _flag (event) {
    event.preventDefault();
    const { blockFlagged, cell, matrix, level } = this.props;
    blockFlagged(cell, matrix, level);
  }

  render () {
    const { cell } = this.props;
    return (
      <div className="cell"
        onClick={ this._reveal.bind(this) } 
        onContextMenu={ this._flag.bind(this) }
      >
      {this.renderCellContent(cell)}
    </div>
    )
  }
}

/**
 * 修改单元状态
 * @param {*} matrix 游戏矩阵
 * @param {*} cell 一个单元
 * @param {*} level 游戏等级
 * @param {*} onContextMenu 是否右键
 */
function replaceAllCellStatus (matrix, cell, level, onContextMenu) {
  const { rowIndex, colIndex, status, isMine, value } = cell
  const nextMatrix = JSON.parse(JSON.stringify(matrix))
  let nextStatus = status
  if (onContextMenu) {
    switch (status) {
      case CellTypes.CELL_NOT_REVEAL:
        nextStatus = CellTypes.CELL_FLAG;
        break;
      case CellTypes.CELL_FLAG:
        nextStatus = CellTypes.CELL_NOT_REVEAL;
        break;
      default: 
        break;
    }
  } else {
    if (status === CellTypes.CELL_NOT_REVEAL) {
      // 空单元
      if (!isMine && value === 0) {
        return revealEmptyCell(nextMatrix, cell, level)
      } else if (isMine) {
        // 地雷
        return revealAllCell(nextMatrix)
      } else {
        // 数字
        nextStatus = CellTypes.CELL_NUMBER;
      }
    }
  }
  nextMatrix[rowIndex][colIndex] = {
    rowIndex,
    colIndex,
    status: nextStatus,
    isMine,
    value
  }
  return nextMatrix
}

/**
 * 遍历清除当前周围的空单元
 * @param {*} matrix 游戏矩阵
 * @param {*} cell 一个单元
 * @param {*} level 游戏等级
 */
function revealEmptyCell (matrix, cell, level) {
  const around = traverseMatrix(matrix, cell, level);
  around.forEach((block) => {
    const { status, value, isMine } = block
    if (status === CellTypes.CELL_NOT_REVEAL && value === 0 && !isMine) {
      block.status = CellTypes.CELL_NULL;
      revealEmptyCell(matrix, block, level);
    }
  });
  return matrix;
}

/**
 * 翻开所有的单元
 * @param {*} matrix 游戏矩阵
 */
function revealAllCell (matrix) {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isMine) {
        cell.status = CellTypes.CELL_MINE
      } else if (cell.value > 0) {
        cell.status = CellTypes.CELL_NUMBER
      } else if (cell.value === 0) {
        cell.status = CellTypes.CELL_NULL
      }
    })
  })
  return matrix
}

/**
 * 判断游戏是否成功
 * @param {*} matrix 游戏矩阵
 * @param {*} level 游戏等级
 */
function isSuccess (matrix, level) {
  const { mineCount } = mapLevel[level]
  let count = 0
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.status === CellTypes.CELL_NOT_REVEAL) {
        count++
      }
    })
  })
  return mineCount === count
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => {
  return {
    blockRevealed: (cell, matrix, level) => {
      const nextMatrix = replaceAllCellStatus(matrix, cell, level)
      dispatch(changeMatrix(nextMatrix));
      if (cell.isMine) {
        dispatch(changeStatus(2))
      }
      if (isSuccess(nextMatrix, level)) {
        dispatch(changeStatus(1))
      }
    },
    blockFlagged: (cell, matrix, level) => {
      dispatch(changeMatrix(replaceAllCellStatus(matrix, cell, level, true)));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
