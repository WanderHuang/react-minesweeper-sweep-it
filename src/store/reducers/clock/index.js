import { CHANGE_CLOCK_STATUS } from '../../types';

const initState = 0;

const clockStatus = (state = initState, action) => {
  switch(action.type) {
    case CHANGE_CLOCK_STATUS: {
      return action.payload;
    }
    default: 
      return state;
  }
}

export default clockStatus;