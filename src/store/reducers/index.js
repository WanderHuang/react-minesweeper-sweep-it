import { combineReducers } from 'redux'
import matrix from './matrix'
import level from './level'
import gameStatus from './status'
import mine from './mine'
import clockStatus from './clock'
import animationStatus from './animation'

const reducers = combineReducers({
  matrix,
  level,
  gameStatus,
  mine,
  clockStatus,
  animationStatus
})

export default reducers