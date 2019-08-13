import React from 'react';
import { connect } from 'react-redux';
import { changeLevel, initMatrix, changeStatus } from '../../store/actions';
import { mapLevel, GameStatus } from '../../util';

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

  renderInfo (gameStatus) {
    switch (gameStatus) {
      case GameStatus.GAME_NOT_START:
        return (<span>To be start</span>);
      case GameStatus.GAME_ON:
        return (<span>On Game</span>);
      case GameStatus.GAME_PAUSED:
        return (<span>Game Paused</span>);
      case GameStatus.GAME_CONTINUED:
        return (<span>On Game</span>);
      case GameStatus.GAME_FAILED:
        return (<span>Game Failed</span>);
      case GameStatus.GAME_SUCCESS:
        return (<span style={{color: 'red'}}>Game Success</span>);
      default:
        return (<span>On Game</span>);
    }
  }

  renderData (mine, level) {
    const { mineCount } = mapLevel[level]
    return (
      <React.Fragment>
        <div className="line">
          <span className="title">Remain Block</span>
          <span>{ mine.notRevealed }</span>
        </div>
        <div className="line">
          <span className="title">Flagged Block</span>
          <span>{ mine.flagged }</span>
        </div>
        <div className="line">
          <span className="title">Should Find</span>
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
          <span className="title">Level Select:</span>
          <select name="levelSelector" value={level} onChange={ this._levelChange.bind(this) }>
            <option value="0">simple</option>
            <option value="1">medium</option>
            <option value="2">hard</option>
            <option value="3">super</option>
          </select>
        </div>
        <div className="line">
          <span className="title">Current Level</span>
          <span>{ ['simple', 'medium', 'hard', 'super'][level] }</span>
        </div>
        { this.renderData(mine, level) }
        
        <div className="line">
          <span className="title">Current Status</span>
          { this.renderInfo(gameStatus) }
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