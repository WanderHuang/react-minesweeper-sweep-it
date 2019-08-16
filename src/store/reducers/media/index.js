import { CHANGE_MEDIA, CHANGE_MEDIA_TIMER } from '../../types';

const initMatrix = null;
const initTimer = null

export const mediaMatrix = (state = initMatrix, action) => {
  switch(action.type) {
    case CHANGE_MEDIA:
      return action.payload;
    default: 
      return state;
  }
}

export const mediaTimer = (state = initTimer, action) => {
  switch(action.type) {
    case CHANGE_MEDIA_TIMER:
      return action.payload;
    default:
      return state;
  }
}