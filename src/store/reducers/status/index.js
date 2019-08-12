import { CHANGE_STATUS } from '../../types';

const initState = true;

const status = (state = initState, action) => {
  switch(action.type) {
    case CHANGE_STATUS: {
      return action.payload;
    }
    default: 
      return state;
  }
}

export default status;