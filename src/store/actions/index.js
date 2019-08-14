import * as types from '../types';
export function changeLevel (payload) {
  return {
    type: types.CHANGE_LEVEL,
    payload
  }
}
export function changeMatrix (payload) {
  return {
    type: types.CHANGE_MATRIX,
    payload
  }
}

export function initMatrix (payload) {
  return {
    type: types.INIT_MATRIX,
    payload
  }
}

export function changeStatus (payload) {
  return {
    type: types.CHANGE_STATUS,
    payload
  }
}

export function resetClock (payload) {
  return {
    type: types.CHANGE_CLOCK_STATUS,
    payload
  }
}
