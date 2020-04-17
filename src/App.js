import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { Animations } from './constant';
import Board from './components/Board';
class App extends React.Component {
  render() {
    const { animationStatus } = this.props;
    const index = animationStatus ? 1 : 0;
    return (
      <div className="app" style={ Animations[index] }>
        <h1>Minesweeper: Sweep it, Bro!</h1>
        <h2 className="subTitle"><a href="https://github.com/WanderHuang/react-minesweeper-sweep-it">Find Me</a></h2>
        <div className="boardArea">
          <Board></Board>
        </div>
      </div>
    )
  }
}

/* connect */
const mapStateToProps = (state) => {
  return {
    animationStatus: state.animationStatus
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     displayRandomMedia: (level = 3, time = 1000) => {
//       return setInterval(() => {
//         dispatch(changeMediaMatrix(randomMediaFrame(level)));
//       }, time)
//     },
//     displayFailedMedia: (matrix, time = 1000) => {
//       dispatch(function (dispatch) {
//         let prev = { i: 0, j: 0 }
//         const timer =setInterval(() => {
//           const { i, j } = prev;
//           prev = failedMediaFrame(matrix, i, j);
//           dispatch(changeMediaMatrix(prev.matrix));
//           if (i > matrix.length - 1 && j > matrix.length - 1) {
//             clearInterval(timer)
//           }
//         }, time)
//       });
//     },
//     displaySuccessMedia: (level = 3, time = 1000) => {
//       return setInterval(() => {
//         dispatch(changeMediaMatrix(randomMediaFrame(level)));
//       }, time)
//     },
//     displayPausedMedia: (level = 3, time = 1000) => {
//       return setInterval(() => {
//         dispatch(changeMediaMatrix(randomMediaFrame(level)));
//       }, time)
//     },
//     clearMedia: (timer, mediaMatrix) => {
//       if (timer) {
//         clearInterval(timer)
//         if (mediaMatrix) {
//           dispatch(changeMediaMatrix(null));
//         }
//       }
//     }
//   }
// }

export default connect(mapStateToProps)(App)