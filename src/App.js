import React from 'react';
import { connect } from 'react-redux';

import './App.scss';
import Board from './components/Board';
class App extends React.Component {
  render() {
    const { matrix, level, gameStatus } = this.props
    return (
      <div className="app">
        <h1>This is a minesweeper game!</h1>
        <Board
          matrix={matrix}
          level={level}
          status={gameStatus}
        ></Board>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  matrix: state.matrix,
  level: state.level,
  status: state.status
});

export default connect(mapStateToProps)(App);