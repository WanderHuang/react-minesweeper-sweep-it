import { combineReducers } from 'redux'
import matrix from './matrix'
import level from './level'
import gameStatus from './status'
import mine from './mine'
import clockStatus from './clock'

const reducers = combineReducers({
  matrix,
  level,
  gameStatus,
  mine,
  clockStatus
})

export default reducers