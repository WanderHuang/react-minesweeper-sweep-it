import { CHANGE_LEVEL } from '../../types';

const initState = 0;

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