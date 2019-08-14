import React from 'react';
import { Emojis } from '../../constant';
import Emoji from '../Emoji';
import Matrix from '../Matrix';
import Info from '../Info';
export default class Board extends React.Component {
  render () {
    return (
      <div className="board">
        <Info></Info>
        <div className="zone">
          <Matrix></Matrix>
        </div>
        <section>
          <div className="line">
            <span>Description:</span>
          </div>
          <div className="line">
            <span>* </span>
            <span>Click </span>
            <Emoji emoji={ Emojis.GAME_MEDIUM } />
            <span> can change the degree of dificulty</span>
          </div>
        </section>
      </div>
    )
  }
}