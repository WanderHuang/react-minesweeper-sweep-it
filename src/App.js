import React from 'react';
import './App.scss';
import Board from './components/Board';
export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>This is a minesweeper game!</h1>
        <Board></Board>
      </div>
    )
  }
}