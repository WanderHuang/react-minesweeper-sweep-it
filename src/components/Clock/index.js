import React from 'react';
import { connect } from 'react-redux';
import { Emojis, ClockStatus, GameStatus } from '../../constant';
// 组件
import Emoji from '../Emoji';
class Clock extends React.Component {
  timer;
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    }
  }
  componentDidMount () {
    this.timer = setInterval (() => {
      const { clockStatus } = this.props;
      if (clockStatus === ClockStatus.CONTINUE) {
        this.setState({time: this.state.time + 1})
      }
    }, 1000)
  }
  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  render () {
    const { time } = this.state;
    return (
      <div className="line">
        <Emoji emoji={ Emojis.INFO_CLOCK }></Emoji>
        <span>{ time } s</span>
      </div>
    )
  }
}

/* connect */

const mapStateToProps = (state) => {
  const status = state.gameStatus
  let clockStatus = 0
  switch (status) {
    case (GameStatus.GAME_CONTINUED):
    case (GameStatus.GAME_ON):
      clockStatus = 1;
      break;
    default:
      clockStatus = 0;
  }
  return { clockStatus }
}


export default connect(mapStateToProps)(Clock);