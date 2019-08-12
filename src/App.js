import React from 'react';
import { connect } from 'react-redux';

import './App.scss';
import Board from './components/Board';
class App extends React.Component {
  render() {
    const { matrix, level, status } = this.props
    console.log('matrix, level, status', matrix, level, status)
    return (
      <div className="app">
        <h6>This is a minesweeper game!</h6>
        <Board
          matrix={matrix}
          level={level}
          status={status}
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