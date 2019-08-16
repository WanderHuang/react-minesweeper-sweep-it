import { failedMediaFrame, successMediaFrame } from '../../util';
import { changeMediaMatrix, changeMediaTimer } from './pure';

// 播放图像
// 原理
// 1. 利用redux-thunk 分发异步dispath事件
// 2. 设置并维护一个全局的视频控制器timer 该控制器可以在需要的时候用于清除视频
// 3. 循环播放

/**
 * 播放失败视频
 * @param {Function} dispatch 
 * @param {Array} matrix 
 * @param {Number} time 
 */
export function runFailedMedia (dispatch, matrix, time = 40) {
  dispatch(function (dispatch) {
    const len = matrix.length
    let prev = { rowIndex: len - 1, colIndex: 0, isNextLine: false, isPositive: true }
    const timer = setInterval(() => {
      if (!prev.isNextLine) {
        const { rowIndex, colIndex, isPositive } = prev;
        prev = failedMediaFrame(matrix, rowIndex, colIndex, isPositive);
        dispatch(changeMediaMatrix(prev.matrix));
        // 正向转为逆向
        if (isPositive && !prev.isPositive) {
          prev.rowIndex = 0
          prev.colIndex = len - 1
          prev.isNextLine = false
        }
        // 逆向转为正向
        if (!isPositive && prev.isPositive) {
          prev.rowIndex = len - 1
          prev.colIndex = 0
          prev.isNextLine = false
        }

      } else {
        prev.isNextLine = false
      }
    }, time)
    dispatch(changeMediaTimer(timer))
  })
}

/**
 * 播放成功的视频
 * @param {Function} dispatch 
 * @param {Array} matrix 
 * @param {Number} time 
 */
export function runSuccessMedia (dispatch, matrix, time = 40) {
  dispatch(function (dispatch) {
    const len = matrix.length
    let prev = { rowIndex: len - 1, colIndex: 0, isNextLine: false, isPositive: true }
    const timer = setInterval(() => {
      if (!prev.isNextLine) {
        const { rowIndex, colIndex, isPositive } = prev;
        prev = successMediaFrame(matrix, rowIndex, colIndex, isPositive);
        dispatch(changeMediaMatrix(prev.matrix));
        // 正向转为逆向
        if (isPositive && !prev.isPositive) {
          prev.rowIndex = 0
          prev.colIndex = len - 1
          prev.isNextLine = false
        }
        // 逆向转为正向
        if (!isPositive && prev.isPositive) {
          prev.rowIndex = len - 1
          prev.colIndex = 0
          prev.isNextLine = false
        }

      } else {
        prev.isNextLine = false
      }
    }, time)
    dispatch(changeMediaTimer(timer))
  })
}
