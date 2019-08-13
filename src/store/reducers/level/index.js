import { CHANGE_LEVEL } from '../../types';
import { GameLevel } from '../../../constant';

const initState = GameLevel.MEDIUM;

const level = (state = initState, action) => {
  switch(action.type) {
    case CHANGE_LEVEL: {
      return action.payload;
    }
    default: 
      return state;
  }
}

export default level;