import React from 'react';
import { connect } from 'react-redux';
import { changeLevel, initMatrix, changeStatus } from '../../store/actions';
import { mapLevel } from '../../util';

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

  renderInfo (status) {
    switch (status) {
      case 0:
        return (<span>On Game</span>);
      case 1:
        return (<span>Success</span>);
      case 2:
        return (<span>Game Over</span>);
      default:
        return ''
    }
  }

  renderData (mine, level) {
    const { mineCount } = mapLevel[level]
    return (
      <React.Fragment>
        <div className="info">
          <span>Should Find:</span>
          <span>{ mineCount }</span>
        </div>
        <div className="info">
          <span>Remain Block:</span>
          <span>{ mine.notRevealed }</span>
        </div>
        <div className="info">
          <span>Flagged Block:</span>
          <span>{ mine.flagged }</span>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { level, status, mine } = this.props
    return (
      <div className="info">
        <div className="line">
          <span>Level Select:</span>
          <select name="levelSelector" value={level} onChange={ this._levelChange.bind(this) }>
            <option value="0">simple</option>
            <option value="1">medium</option>
            <option value="2">hard</option>
            <option value="3">super</option>
          </select>
        </div>
        <div className="info">
          <span>Current Level:</span>
          <span>{ level }</span>
          <button onClick={ this._restart.bind(this) }>Restart</button>
        </div>
        { this.renderData(mine, level) }
        
        <div className="info">
          { this.renderInfo(status) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    levelChange: ({ target }) => {
      const level = Number(target.value)
      dispatch(changeLevel(level));
      dispatch(initMatrix(level));
      dispatch(changeStatus(0));
    },
    restart: (level) => {
      dispatch(initMatrix(level));
      dispatch(changeStatus(0));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)