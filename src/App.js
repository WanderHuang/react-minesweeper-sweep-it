import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { Animations, GameStatus } from './constant';
import { changeMediaMatrix } from './store/actions';
import { randomMediaFrame, failedMediaFrame } from './util';
import Board from './components/Board';
class App extends React.Component {
  timer;
  mediaTimer;
  componentDidMount() {
    const {
      displayFailedMedia,
      displaySuccessMedia,
      displayPausedMedia,
      clearMedia
    } = this.props;

    this.timer = this.loop(() => {
      if (!this.mediaTimer) {
        const { gameStatus, level, matrix } = this.props;
        if (gameStatus === GameStatus.GAME_FAILED) {
          this.mediaTimer = displayFailedMedia(matrix);
        } else if (gameStatus === GameStatus.GAME_SUCCESS) {
          this.mediaTimer = displaySuccessMedia(level, 3000);
        } else if (gameStatus === GameStatus.GAME_PAUSED) {
          this.mediaTimer = displayPausedMedia(level, 3000);
        }
      } else {
        const { gameStatus, mediaMatrix } = this.props;
        if (
          gameStatus === GameStatus.GAME_CONTINUED ||
          gameStatus === GameStatus.GAME_ON
        ) {
          clearMedia(this.mediaTimer, mediaMatrix);
          this.mediaTimer = null;
        }
      }
    });
  }

  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  loop (fn, timer = 60) {
    if (window.requestAnimationFrame) {
      if (typeof fn === 'function') {
        fn = fn.bind(this);
        function step () {
          fn();
          window.requestAnimationFrame(step);
        }
        step();
      }
    } else {
      return setInterval(fn, timer)
    }
  }

  render() {
    const { animationStatus } = this.props;
    const index = animationStatus ? 1 : 0;
    return (
      <div className="app" style={ Animations[index] }>
        <h1>Minesweeper: Sweep it, Bro!</h1>
        <div className="boardArea">
          <Board></Board>
        </div>
      </div>
    )
  }
}

/* connect */
const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
  return {
    displayRandomMedia: (level = 3, time = 1000) => {
      return setInterval(() => {
        dispatch(changeMediaMatrix(randomMediaFrame(level)));
      }, time)
    },
    displayFailedMedia: (matirx, time = 300) => {
      let prev = failedMediaFrame(matirx, 0, 0);
      dispatch(changeMediaMatrix(prev.matrix));
      return setInterval(() => {
        const { i, j } = prev;
        prev = failedMediaFrame(matirx, i, j);
        dispatch(changeMediaMatrix(prev.matrix));
      }, time)
    },
    displaySuccessMedia: (level = 3, time = 1000) => {
      return setInterval(() => {
        dispatch(changeMediaMatrix(randomMediaFrame(level)));
      }, time)
    },
    displayPausedMedia: (level = 3, time = 1000) => {
      return setInterval(() => {
        dispatch(changeMediaMatrix(randomMediaFrame(level)));
      }, time)
    },
    clearMedia: (timer, mediaMatrix) => {
      if (timer) {
        clearInterval(timer)
        if (mediaMatrix) {
          dispatch(changeMediaMatrix(null));
        }
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)