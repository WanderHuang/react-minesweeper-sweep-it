import { CHANGE_MATRIX, INIT_MATRIX } from '../../types';
import * as util from '../../../util';

const initMatrix = (level) => {
  const empty = util.createEmptyMatrix(level)
  const withMines = util.initMinesToMatrix(empty, level);
  const withValues = util.initCellValues(withMines, level);
  return withValues
}

const matrix = (state = initMatrix(0), action) => {
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