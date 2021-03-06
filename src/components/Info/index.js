import React from 'react';
import { connect } from 'react-redux';
// 工具
import { changeLevel, initMatrix, changeStatus, changeAnimationStatus, changeMediaTimer, changeMediaMatrix } from '../../store/actions';
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
  _levelChangeEvent (event) {
    event.preventDefault();
    const { levelChange, mediaTimer } = this.props;
    levelChange(event, mediaTimer);
  }

  _levelClickEvent (event) {
    event.preventDefault();
    const { level, levelChange, mediaTimer } = this.props;
    let value = level + 1
    value = value > 3 ? 0 : value
    levelChange({ target: { value }}, mediaTimer)
  }

  // 【重新开始】响应
  _restart (event) {
    event.preventDefault();
    const { restart, level, mediaTimer } = this.props;
    restart(level, mediaTimer);
    this.refClock.current.resetClock(0);
  }
  // 【暂停】响应
  _pause (event) {
    event.preventDefault();
    const { gameStatus, pause } = this.props;
    pause(gameStatus);
  }
  // 确定是否使用动画
  _toggleAnimation (event) {
    event.preventDefault();
    const { toggleAnimation, animationStatus } = this.props;
    toggleAnimation(animationStatus);
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

  // 渲染背景动画
  renderAnimationButtonContent (status) {
    if (status) {
      return 'Static'
    } else {
      return 'Dynamic'
    }
  }

  // 渲染开始按钮
  renderRestartButtonContent (status) {
    if (status === GameStatus.GAME_NOT_START) {
      return 'Start'
    } else {
      return 'Restart'
    }
  }

  // 渲染等级emoji
  renderLevelEmoji (level) {
    return [Emojis.GAME_EASY, Emojis.GAME_MEDIUM, Emojis.GAME_HARD, Emojis.GAME_SUPER][level];
  }

  render() {
    const { level, gameStatus, mine, animationStatus } = this.props
    return (
      <div className="info">
        {
          /* 
          去除这个select框 用点击emoji代替
          <div className="line">
            <Emoji emoji={ Emojis.INFO_LEVEL_CHOICE }></Emoji>
            <select name="levelSelector" value={level} onChange={ this._levelChangeEvent.bind(this) }>
              <option className="option" value="0">{ Emojis.GAME_EASY.content }</option>
              <option className="option" value="1">{ Emojis.GAME_MEDIUM.content }</option>
              <option className="option" value="2">{ Emojis.GAME_HARD.content }</option>
              <option className="option" value="3">{ Emojis.GAME_SUPER.content }</option>
            </select>
          </div> 
          */
        }
        <div className="line">
          <Emoji emoji={ Emojis.INFO_LEVEL }></Emoji>
          <Emoji emoji={ this.renderLevelEmoji(level)} onClick={ this._levelClickEvent.bind(this) } css="content-right"></Emoji>
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
          <button className="animation" onClick={ this._toggleAnimation.bind(this) }>{ this.renderAnimationButtonContent(animationStatus) }</button>
          <button className="pause" onClick={ this._pause.bind(this) }>{ this.renderPauseButtonContent(gameStatus) }</button>
          <button className="restart" onClick={ this._restart.bind(this) }>{ this.renderRestartButtonContent(gameStatus) }</button>
        </div>
        <div className="line">
          <a className="source-code" href="https://github.com/WanderHuang/react-minesweeper-sweep-it">Source Code</a>
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
    levelChange: ({ target }, mediaTimer) => {
      const level = Number(target.value)
      // 关闭视频
      clearInterval(mediaTimer)
      dispatch(changeMediaTimer(null))
      dispatch(changeMediaMatrix(null))
      // 修改游戏难度
      dispatch(changeLevel(level));
      // 初始化游戏矩阵
      dispatch(initMatrix(level));
      // 修改游戏状态
      dispatch(changeStatus(GameStatus.GAME_NOT_START));
    },
    restart: (level, mediaTimer) => {
      // 关闭视频
      clearInterval(mediaTimer)
      dispatch(changeMediaTimer(null))
      dispatch(changeMediaMatrix(null))
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
    },
    toggleAnimation: (animation) => {
      dispatch(changeAnimationStatus(!animation))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)