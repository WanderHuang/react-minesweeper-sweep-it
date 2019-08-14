import { CHANGE_ANIMATION_STATUS } from '../../types';

const initState = true;

const animationStatus = (state = initState, action) => {
  switch(action.type) {
    case CHANGE_ANIMATION_STATUS: {
      return action.payload;
    }
    default: 
      return state;
  }
}

export default animationStatus;