import { CHANGE_MATRIX } from '../../types';
import { mineStatistics } from '../../../util';
import { mapLevel } from '../../../constant'

const initMine = (level) => {
  return {
    notRevealed: Math.pow(mapLevel[level].baseCount, 2),
    flagged: 0
  }
}

const mine = (state = initMine(0), action) => {
  switch(action.type) {
    case CHANGE_MATRIX:
      return mineStatistics(action.payload);
    default: 
      return state;
  }
}

export default mine;