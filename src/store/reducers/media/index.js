import { CHANGE_MEDIA } from '../../types';

const initMatrix = null;

const mediaMatrix = (state = initMatrix, action) => {
  switch(action.type) {
    case CHANGE_MEDIA:
      return action.payload;
    default: 
      return state;
  }
}

export default mediaMatrix;