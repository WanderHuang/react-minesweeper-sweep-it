import React from 'react';
import { connect } from 'react-redux';
// 工具
import { CellTypes, GameStatus } from '../../constant';
import { changeMatrix, changeStatus } from '../../store/actions';
import { isSuccess, replaceAllCellStatus } from './helper';
import { Emojis } from '../../constant';
// 组件
import Emoji from '../Emoji';
import CellFont from './CellFont';
class Cell extends React.Component {

  renderCellContent (cell) {
    const { status, isMine, value, isEmoji, emoji } = cell
    switch (status) {
      case CellTypes.CELL_NOT_REVEAL:
        return (
          <div className="block"></div>
        );
      case CellTypes.CELL_NULL:
        return (
          <div className="revealed-block">
            <Emoji emoji={ isEmoji ? emoji : Emojis.MONKEY } cursor></Emoji>
          </div>
        );
      case CellTypes.CELL_NUMBER:
        return (
          <div className="revealed-block">
            <CellFont content={ value }/>
          </div>
        );
      case CellTypes.CELL_MINE:
        return (
          <div className="revealed-block">
            {
              isMine ?
              <Emoji emoji={ Emojis.MINE }></Emoji> :
              <Emoji emoji={ Emojis.MONKEY }></Emoji>
            }
          </div>
        );
      case CellTypes.CELL_FLAG:
        return (
          <div className="block">
            <Emoji emoji={ Emojis.FLAG }></Emoji>
          </div>
        );
      default:
        return <div></div>
    }
  }
  // 翻开方块
  _reveal (event) {
    event.preventDefault();
    const { blockRevealed, cell, matrix, level, gameStatus } = this.props;
    blockRevealed(cell, matrix, level, gameStatus);
  }
  // 标记方块
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

/* connect Cell到容器中 */

// 获取所有的状态。映射到props
const mapStateToProps = (state) => state

// 处理状态变更的方法。映射到props
const mapDispatchToProps = (dispatch, props) => {
  return {
    blockRevealed: (cell, matrix, level, gameStatus) => {
      // 游戏暂停、胜利、失败；或者当前方块被标记的情况下 不响应左击事件
      // 新增：单元为纯图像不触发左击事件
      if (
        gameStatus === GameStatus.GAME_PAUSED ||
        gameStatus === GameStatus.GAME_SUCCESS ||
        gameStatus === GameStatus.GAME_FAILED ||
        cell.status === CellTypes.CELL_FLAG ||
        cell.isEmoji
      ) {
        return
      }
      // 若 戏空闲状态 变更为进行中
      if (gameStatus === GameStatus.GAME_NOT_START) {
        dispatch(changeStatus(GameStatus.GAME_ON));
      }
      // 处理cell状态变更。如果是踩雷，翻开所有的方块
      const nextMatrix = replaceAllCellStatus(matrix, cell, level)
      // 踩雷则游戏结束
      if (cell.isMine) {
        dispatch(changeStatus(GameStatus.GAME_FAILED));
        // 判断游戏是否成功
      } else if (isSuccess(nextMatrix, level)) {
        dispatch(changeStatus(GameStatus.GAME_SUCCESS));
      }
      dispatch(changeMatrix(nextMatrix));
    },
    blockFlagged: (cell, matrix, level, gameStatus) => {
      // 游戏暂停、胜利、失败的情况下 不响应右击事件
      // 新增：单元为纯图像不触发右击事件
      if (
        gameStatus === GameStatus.GAME_PAUSED ||
        gameStatus === GameStatus.GAME_SUCCESS ||
        gameStatus === GameStatus.GAME_FAILED ||
        cell.isEmoji
      ) {
        return
      }
      // 若 戏空闲状态 变更为进行中
      if (gameStatus === GameStatus.GAME_NOT_START) {
        dispatch(changeStatus(GameStatus.GAME_ON));
      }
      // 处理cell状态变更。
      const nextMatrix = replaceAllCellStatus(matrix, cell, level, true)
      // 游戏成功
      if (isSuccess(nextMatrix, level)) {
        dispatch(changeStatus(GameStatus.GAME_SUCCESS));
      }
      dispatch(changeMatrix(nextMatrix));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
