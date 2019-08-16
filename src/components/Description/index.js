import React from 'react';
import { Emojis } from '../../constant';
import Emoji from '../Emoji';
export default class Description extends React.Component {
  render () {
    return (
      <section>
        <div className="title">
          <span>Description:</span>
        </div>
        <div className="simple-description">
          <span>Minesweeper is a classic windows game,</span>
          <span>I moved it to the browser,</span>
          <span>I wish you will feel relax after a day work with it.</span>
        </div>
        <div className="content">
          <div className="line">
            <span>* </span>
            <span>Click </span>
            <Emoji emoji={ Emojis.GAME_MEDIUM } />
            <span> can change the degree of difficulty.</span>
          </div>
          <div className="line">
            <span>* </span>
            <span>Click </span>
            <span className="pink">Static</span>
            <span> to toggle background between `static` and `dynamic`</span>
          </div>
          <div className="line">
            <span>* </span>
            <span>Click </span>
            <span className="cyan">Pause</span>
            <span> to stop/continue your Game</span>
          </div>
          <div className="line">
            <span>* </span>
            <span>Click </span>
            <span className="green">Start</span>
            <span> to start your game.</span>
          </div>
          <div className="line">
            <span>* Left mouse click: reveal one cell.</span>
          </div>
          <div className="line">
            <span>* Right mouse click: mark one cell if you think it is a mine.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.INFO_NUMBER }></Emoji>
            <span> : means there are `n` mines surround it.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.MONKEY }></Emoji>
            <span> : means saft area.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.INFO_LEVEL }></Emoji>
            <span> : means current `level` of your game.Simple, Medium, Hard, Super is supplied.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.INFO_GAME_BLOCK }></Emoji>
            <span> : means total `n` cells is supplied.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.FLAG }></Emoji>
            <span> : means `n` flag is used.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.MINE }></Emoji>
            <span> : means total `n` mines under the cells.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.INFO_GAME_STATUS }></Emoji>
            <span> : shows current game status.</span>
          </div>
          <div className="line">
            <span>* </span>
            <Emoji emoji={ Emojis.INFO_CLOCK }></Emoji>
            <span> : shows how much time you used to `sweep it`!</span>
          </div>
        </div>
      </section>
    )
  }
}