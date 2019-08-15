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

export default connect(mapStateToProps)(App)