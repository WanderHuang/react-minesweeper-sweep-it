import { combineReducers } from 'redux'
import matrix from './matrix'
import level from './level'
import gameStatus from './status'
import mine from './mine'

const reducers = combineReducers({
  matrix,
  level,
  gameStatus,
  mine
})

export default reducers