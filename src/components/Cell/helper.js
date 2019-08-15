import { CellTypes } from '../../constant'
import { traverseMatrix } from '../../util'
/**
 * 判断游戏是否成功
 * @param {*} matrix 游戏矩阵
 * @param {*} level 游戏等级
 */
export const isSuccess = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].status === CellTypes.CELL_NOT_REVEAL) {
        return false
      }
    }
  }
  return true
}

/**
 * 修改单元状态
 * @param {*} matrix 游戏矩阵
 * @param {*} cell 一个单元
 * @param {*} level 游戏等级
 * @param {*} onContextMenu 是否右键
 */
export const replaceAllCellStatus = (matrix, cell, level, onContextMenu) => {
  const { rowIndex, colIndex, status, isMine, value } = cell
  const nextMatrix = JSON.parse(JSON.stringify(matrix))
  let nextStatus = status
  if (onContextMenu) {
    switch (status) {
      case CellTypes.CELL_NOT_REVEAL:
        nextStatus = CellTypes.CELL_FLAG;
        break;
      case CellTypes.CELL_FLAG:
        nextStatus = CellTypes.CELL_NOT_REVEAL;
        break;
      default: 
        break;
    }
  } else {
    if (status === CellTypes.CELL_NOT_REVEAL) {
      // 空单元
      if (!isMine && value === 0) {
        return revealEmptyCell(nextMatrix, cell, level)
      } else if (isMine) {
        // 地雷
        return revealAllCell(nextMatrix)
      } else {
        // 数字
        nextStatus = CellTypes.CELL_NUMBER;
      }
    }
  }
  nextMatrix[rowIndex][colIndex] = {
    rowIndex,
    colIndex,
    status: nextStatus,
    isMine,
    value
  }
  return nextMatrix
}

const isNullCell = (cell) => {
  const { status, value, isMine } = cell
  return status === CellTypes.CELL_NOT_REVEAL && value === 0 && !isMine
}

/**
 * 遍历清除当前周围的空单元
 * @param {*} matrix 游戏矩阵
 * @param {*} cell 一个单元
 * @param {*} level 游戏等级
 */
export const revealEmptyCell = (matrix, cell, level) => {
  const around = traverseMatrix(matrix, cell, level);
  around.forEach((block) => {
    const { status, value } = block;
    if (isNullCell(block)) {
      block.status = CellTypes.CELL_NULL;
      revealEmptyCell(matrix, block, level);
    }
    // if (status === CellTypes.CELL_NOT_REVEAL && value === 0 && !isMine) {
    //   block.status = CellTypes.CELL_NULL;
    //   revealEmptyCell(matrix, block, level);
    // }
    if (status === CellTypes.CELL_NOT_REVEAL && value !== 0) {
      block.status = CellTypes.CELL_NUMBER;
    }
  });
  // This cell may not be the matrix's cell, so should set to matrix
  // fix: one monkey surrounded with numbers that cannot be revealed
  // Recursive Function will check cell repeatly...
  if (isNullCell(cell)) {
    const { rowIndex, colIndex } = cell
    cell.status = CellTypes.CELL_NULL;
    matrix[rowIndex][colIndex].status = CellTypes.CELL_NULL
  }
  return matrix;
}

/**
 * 翻开所有的单元
 * @param {*} matrix 游戏矩阵
 */
export const revealAllCell = (matrix) => {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isMine) {
        cell.status = CellTypes.CELL_MINE
      } else if (cell.value > 0) {
        cell.status = CellTypes.CELL_NUMBER
      } else if (cell.value === 0) {
        cell.status = CellTypes.CELL_NULL
      }
    })
  })
  return matrix
}