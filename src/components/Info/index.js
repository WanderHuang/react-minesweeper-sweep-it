import React from 'react';
import { connect } from 'react-redux';
// 工具
import { changeLevel, initMatrix, changeStatus } from '../../store/actions';
import { mapLevel, GameStatus, Emojis } from '../../constant';
// 组件
import Emoji from '../Emoji';

class Info extends React.Component {
  _levelChange (event) {
    event.preventDefault();
    const { levelChange } = this.props;
    levelChange(event);
  }

  _restart (event) {
    event.preventDefault();
    const { level, restart } = this.props;
    restart(level);
  }

  _pause (event) {
    event.preventDefault();
    const { gameStatus, pause } = this.props;
    pause(gameStatus);
  }

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

  renderData (mine, level) {
    const { mineCount } = mapLevel[level]
    return (
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
          <span>{ mineCount }</span>
        </div>
      </React.Fragment>
    )
  }

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
        { this.renderData(mine, level) }
        <div className="line">
          <Emoji emoji={ Emojis.INFO_GAME_STATUS }></Emoji>
          { <Emoji emoji={ this.renderGameStatus(gameStatus) } css="content-right"></Emoji> }
        </div>
        <div className="line">
          <button onClick={ this._pause.bind(this) }>{ this.renderPauseButtonContent(gameStatus) }</button>
          <button onClick={ this._restart.bind(this) }>Restart</button>
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
      dispatch(changeLevel(level));
      dispatch(initMatrix(level));
      dispatch(changeStatus(GameStatus.GAME_NOT_START));
    },
    restart: (level) => {
      dispatch(initMatrix(level));
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