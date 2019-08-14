import React from 'react';
import { connect } from 'react-redux';
// 工具
import { changeLevel, initMatrix, changeStatus } from '../../store/actions';
import { mapLevel, GameStatus, Emojis } from '../../constant';
// 组件
import Emoji from '../Emoji';
import Clock from '../Clock';

class Info extends React.Component {
  constructor (props) {
    super(props);
    this.refClock = React.createRef();
  }
  // 【等级变更】响应
  _levelChange (event) {
    event.preventDefault();
    const { levelChange } = this.props;
    levelChange(event);
  }

  // 【重新开始】响应
  _restart (event) {
    event.preventDefault();
    const { level, restart } = this.props;
    restart(level);
    this.refClock.current.resetClock(0);
  }
  // 【暂停】响应
  _pause (event) {
    event.preventDefault();
    const { gameStatus, pause } = this.props;
    pause(gameStatus);
  }
  // 渲染游戏状态
  renderGameStatus (gameStatus) {
    switch (gameStatus) {
      case GameStatus.GAME_NOT_START:
        return Emojis.GAME_IDLE;
      case GameStatus.GAME_PAUSED:
        return Emojis.GAME_PAUSED;
      case GameStatus.GAME_FAILED:
        return Emojis.GAME_FAILED;
      case GameStatus.GAME_SUCCESS:
        return Emojis.GAME_SUCCESS;
      case GameStatus.GAME_ON:
      case GameStatus.GAME_CONTINUED:
      default:
        return Emojis.GAME_PLAYING;
    }
  }

  // 渲染按钮文字
  renderPauseButtonContent (status) {
    switch (status) {
      case GameStatus.GAME_PAUSED:
        return 'Continue';
      default:
        return 'Pause';
    }
  }

  render() {
    const { level, gameStatus, mine } = this.props
    return (
      <div className="info">
        <div className="line">
          <Emoji emoji={ Emojis.INFO_LEVEL_CHOICE }></Emoji>
          <select name="levelSelector" value={level} onChange={ this._levelChange.bind(this) }>
            <option value="0">{ Emojis.GAME_EASY.content }</option>
            <option value="1">{ Emojis.GAME_MEDIUM.content }</option>
            <option value="2">{ Emojis.GAME_HARD.content }</option>
            <option value="3">{ Emojis.GAME_SUPER.content }</option>
          </select>
        </div>
        <div className="line">
          <Emoji emoji={ Emojis.INFO_LEVEL }></Emoji>
          <span>{ [Emojis.GAME_EASY.content, Emojis.GAME_MEDIUM.content, Emojis.GAME_HARD.content, Emojis.GAME_SUPER.content][level] }</span>
        </div>
        { 
          <React.Fragment>
            <div className="line">
              <Emoji emoji={ Emojis.INFO_GAME_BLOCK }></Emoji>
              <span>{ mine.notRevealed }</span>
            </div>
            <div className="line">
              <Emoji emoji={ Emojis.FLAG }></Emoji>
              <span>{ mine.flagged }</span>
            </div>
            <div className="line">
              <Emoji emoji={ Emojis.MINE }></Emoji>
              <span>{ mapLevel[level].mineCount }</span>
            </div>
          </React.Fragment>
        }
        <div className="line">
          <Emoji emoji={ Emojis.INFO_GAME_STATUS }></Emoji>
          { <Emoji emoji={ this.renderGameStatus(gameStatus) } css="content-right"></Emoji> }
        </div>
        <Clock ref={this.refClock}/>
        <div className="line">
          <button className="pause" onClick={ this._pause.bind(this) }>{ this.renderPauseButtonContent(gameStatus) }</button>
          <button className="restart" onClick={ this._restart.bind(this) }>Restart</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    levelChange: ({ target }) => {
      const level = Number(target.value)
      // 修改游戏难度
      dispatch(changeLevel(level));
      // 初始化游戏矩阵
      dispatch(initMatrix(level));
      // 修改游戏状态
      dispatch(changeStatus(GameStatus.GAME_NOT_START));
    },
    restart: (level) => {
      // 重置矩阵
      dispatch(initMatrix(level));
      // 重置游戏状态
      dispatch(changeStatus(GameStatus.GAME_ON));
    },
    pause: (gameStatus) => {
      if (gameStatus === GameStatus.GAME_PAUSED) {
        dispatch(changeStatus(GameStatus.GAME_CONTINUED))
      }
      if (
        gameStatus === GameStatus.GAME_CONTINUED ||
        gameStatus === GameStatus.GAME_ON
      ) {
        dispatch(changeStatus(GameStatus.GAME_PAUSED))
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)