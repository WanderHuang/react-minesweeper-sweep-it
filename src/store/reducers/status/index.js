import { CHANGE_STATUS } from '../../types';

const initState = 0;

const gameStatus = (state = initState, action) => {
  switch(action.type) {
    case CHANGE_STATUS: {
      return action.payload;
    }
    default: 
      return state;
  }
}

export default gameStatus;