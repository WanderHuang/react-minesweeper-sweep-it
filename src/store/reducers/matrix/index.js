import { CHANGE_MATRIX, INIT_MATRIX } from '../../types';
import { createEmptyMatrix, initMinesToMatrix, initCellValues }from '../../../util';
import { GameLevel } from '../../../constant'

const initMatrix = (level) => {
  const empty = createEmptyMatrix(level)
  const withMines = initMinesToMatrix(empty, level);
  const withValues = initCellValues(withMines, level);
  return withValues
}

const matrix = (state = initMatrix(GameLevel.MEDIUM), action) => {
  switch(action.type) {
    case CHANGE_MATRIX:
      return action.payload;
    case INIT_MATRIX:
      return initMatrix(action.payload);
    default: 
      return state;
  }
}

export default matrix;