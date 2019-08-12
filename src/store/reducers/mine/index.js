import { CHANGE_MATRIX } from '../../types';
import * as util from '../../../util';

const mine = (state = { notRevealed: Math.pow(util.mapLevel[0].baseCount, 2) }, action) => {
  switch(action.type) {
    case CHANGE_MATRIX:
      return util.mineStatistics(action.payload);
    default: 
      return state;
  }
}

export default mine;