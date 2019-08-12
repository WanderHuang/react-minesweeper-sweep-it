import { combineReducers } from 'redux'
import matrix from './matrix'
import level from './level'
import status from './status'
import mine from './mine'

const reducers = combineReducers({
  matrix,
  level,
  status,
  mine
})

export default reducers