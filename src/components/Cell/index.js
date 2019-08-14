import React from 'react';
import { connect } from 'react-redux';
// 工具
import { CellTypes, GameStatus } from '../../constant';
import { changeMatrix, changeStatus } from '../../store/actions';
import { isSuccess, replaceAllCellStatus } from './helper'
// 组件
import Emoji from '../Emoji';
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
          <div className="revealed-block">{isMine ? <Emoji content="💣"></Emoji> : ''}</div>
        );
      case CellTypes.CELL_FLAG:
        return (
          <div className="block">
            <Emoji content="⛳"></Emoji>
          </div>
        );
      default:
        return <div></div>
    }
  }

  _reveal (event) {
    event.preventDefault();
    const { blockRevealed, cell, matrix, level, gameStatus } = this.props;
    blockRevealed(cell, matrix, level, gameStatus);
  }
  _flag (event) {
    event.preventDefault();
    const { blockFlagged, cell, matrix, level, gameStatus } = this.props;
    blockFlagged(cell, matrix, level, gameStatus);
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

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch, props) => {
  return {
    blockRevealed: (cell, matrix, level, gameStatus) => {
      if (
        gameStatus === GameStatus.GAME_PAUSED ||
        gameStatus === GameStatus.GAME_SUCCESS ||
        gameStatus === GameStatus.GAME_FAILED
      ) {
        return
      }
      if (gameStatus === GameStatus.GAME_NOT_START) {
        dispatch(changeStatus(GameStatus.GAME_ON));
      }
      const nextMatrix = replaceAllCellStatus(matrix, cell, level)
      dispatch(changeMatrix(nextMatrix));
      if (cell.isMine) {
        dispatch(changeStatus(GameStatus.GAME_FAILED));
      } else if (isSuccess(nextMatrix, level)) {
        dispatch(changeStatus(GameStatus.GAME_SUCCESS));
      }
    },
    blockFlagged: (cell, matrix, level, gameStatus) => {
      if (
        gameStatus === GameStatus.GAME_PAUSED ||
        gameStatus === GameStatus.GAME_SUCCESS ||
        gameStatus === GameStatus.GAME_FAILED
      ) {
        return
      }
      if (gameStatus === GameStatus.GAME_NOT_START) {
        dispatch(changeStatus(GameStatus.GAME_ON));
      }
      const nextMatrix = replaceAllCellStatus(matrix, cell, level, true)
      dispatch(changeMatrix(nextMatrix));
      if (isSuccess(nextMatrix, level)) {
        dispatch(changeStatus(GameStatus.GAME_SUCCESS));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
