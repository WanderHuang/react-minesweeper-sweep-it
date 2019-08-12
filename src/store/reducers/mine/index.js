import { CHANGE_MATRIX } from '../../types';
import * as util from '../../../util';

const initMine = (level) => {
  return {
    notRevealed: Math.pow(util.mapLevel[level].baseCount, 2),
    flagged: 0
  }
}

const mine = (state = initMine(0), action) => {
  switch(action.type) {
    case CHANGE_MATRIX:
      return util.mineStatistics(action.payload);
    default: 
      return state;
  }
}

export default mine;