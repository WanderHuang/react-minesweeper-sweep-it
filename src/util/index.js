import { mapLevel, CellTypes, Emojis } from '../constant'

/**
 * 判断是否是偶数
 * @param {Number} number 
 */
function isEvenNumber(number) {
  return number % 2 === 0
}

/**
 * 初始化一个空二维数组
 * @param { Number } level 当前等级
 */
export const createEmptyMatrix = (level = 0) => {
  const { baseCount } = mapLevel[level];
  const matrix = [];
  for (let i = 0; i < baseCount; i++) {
    const row = []
    for (let j = 0; j < baseCount; j++) {
      row.push({
        rowIndex: i,
        colIndex: j,
        status: CellTypes.CELL_NOT_REVEAL,
        isMine: false,
        value: 0
      })
    }
    matrix.push(row);
  }
  return matrix
}

/**
 * 初始化地雷矩阵
 * @param { Array } matrix 游戏矩阵
 * @param { Number } level 游戏等级
 */
export const initMinesToMatrix = (matrix, level) => {
  const { baseCount, mineCount } = mapLevel[level];
  const mines = [];
  while(mines.length < mineCount) {
    const x = Math.random() * baseCount | 0;
    const y = Math.random() * baseCount | 0;
    const has = mines.findIndex(mine => mine.x === x && mine.y === y);
    if (has < 0) {
      mines.push({ x, y });
    }
  }
  for (let i = 0; i < mineCount; i++) {
    const { x, y } = mines[i];
    matrix[x][y].isMine = true;
  }
  return matrix
}

/**
 * 给每个单元格赋值
 * @param { Array } matrix 游戏矩阵
 * @param { number } level 游戏等级
 */
export const initCellValues = (matrix, level) => {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.isMine) {
        const around = traverseMatrix(matrix, cell, level);
        around.forEach((block) => {
          if (block.isMine) {
            cell.value++
          }
        })
      }
    })
  })
  return matrix;
};

/**
 * 遍历一个单元的周围
 * @param {*} matrix 游戏矩阵
 * @param {*} cell 一个单元
 * @param {*} level 游戏等级
 */
export const traverseMatrix = (matrix, cell, level) => {
  const { baseCount } = mapLevel[level]
  const { rowIndex, colIndex } = cell;
  const around = [];
  if (rowIndex > 0) {
    around.push(matrix[rowIndex - 1][colIndex]);
  }
  if (rowIndex < baseCount - 1) {
    around.push(matrix[rowIndex + 1][colIndex]);
  }
  if (colIndex > 0) {
    around.push(matrix[rowIndex][colIndex - 1]);
  }
  if (colIndex < baseCount - 1) {
    around.push(matrix[rowIndex][colIndex + 1]);
  }
  if (rowIndex > 0 && colIndex > 0) {
    around.push(matrix[rowIndex - 1][colIndex - 1]);
  }
  if (rowIndex > 0 && colIndex < baseCount - 1) {
    around.push(matrix[rowIndex - 1][colIndex + 1]);
  }
  if (rowIndex < baseCount - 1 && colIndex < baseCount - 1) {
    around.push(matrix[rowIndex + 1][colIndex + 1]);
  }
  if (rowIndex < baseCount - 1 && colIndex > 0) {
    around.push(matrix[rowIndex + 1][colIndex - 1]);
  }
  return around;
}

/**
 * 地雷状态统计
 * @param {Array} matrix 游戏矩阵
 */
export const mineStatistics = (matrix) => {
  let notRevealed = 0
  let flagged = 0
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.status === CellTypes.CELL_NOT_REVEAL) {
        notRevealed++
      }
      if (cell.status === CellTypes.CELL_FLAG) {
        flagged++
      }
    })
  })
  return {
    notRevealed,
    flagged
  }
}

/**
 * 产生随机的emoji矩阵
 * @param {Number} level 
 */
export const randomMediaFrame = (level = 3) => {
  const matrix = createEmptyMatrix(level);
  const emojiArray = Object.keys(Emojis);
  const emojiCount = emojiArray.length;
  return matrix.map((row) => {
    return row.map((cell) => {
      const random = Math.random() * emojiCount | 0
      return {
        rowIndex: cell.rowIndex,
        colIndex: cell.colIndex,
        status: CellTypes.CELL_NULL,
        isMine: false,
        isEmoji: true,
        emoji: Emojis[emojiArray[random]],
        value: 0
      }
    })
  })
}

/**
 * 产生一帧失败的矩阵
 * @param {Number} level 
 */
export const failedMediaFrame = (matrix, currentRowIndex, currentColIndex, isPositive) => {
  let isNextLine = false;
  const len = matrix.length;
  if (isPositive) {
    if (currentRowIndex >= 0) {
      const {
        rowIndex,
        colIndex,
        status,
        isMine,
        value
      } = matrix[currentRowIndex][currentColIndex];

      matrix[currentRowIndex][currentColIndex] = {
        rowIndex,
        colIndex,
        cacheStatus: status,
        status: CellTypes.CELL_NULL,
        isMine,
        isEmoji: true,
        emoji: Emojis.GAME_FAILED,
        value
      }

      currentColIndex++;
      if (currentColIndex >= len) {
        currentColIndex = 0;
        currentRowIndex--;
        isNextLine = true;
      }
    } else {
      isPositive = false;
    }
  } else {
    if (currentRowIndex < len) {
      const {
        rowIndex,
        colIndex,
        cacheStatus,
        isMine,
        emoji,
        value
      } = matrix[currentRowIndex][currentColIndex];

      matrix[currentRowIndex][currentColIndex] = {
        rowIndex,
        colIndex,
        cacheStatus,
        status: cacheStatus,
        isMine,
        isEmoji: false,
        emoji,
        value
      }

      currentColIndex--;
      if (currentColIndex < 0) {
        currentColIndex = len - 1;
        currentRowIndex++;
        isNextLine = true;
      }
    } else {
      isPositive = true;
    }
  }
  return {
    matrix: JSON.parse(JSON.stringify(matrix)),
    rowIndex: currentRowIndex,
    colIndex: currentColIndex,
    isNextLine,
    isPositive
  }
}

/**
 * 产生一帧成功的矩阵
 * @param {Number} level 
 */
export const successMediaFrame = (matrix, currentRowIndex, currentColIndex, isPositive) => {
  let isNextLine = false;
  const len = matrix.length;
  if (isPositive) {
    if (currentRowIndex >= 0) {
      const {
        rowIndex,
        colIndex,
        status,
        isMine,
        value
      } = matrix[currentRowIndex][currentColIndex];

      matrix[currentRowIndex][currentColIndex] = {
        rowIndex,
        colIndex,
        cacheStatus: status,
        status: CellTypes.CELL_NULL,
        isMine,
        isEmoji: true,
        emoji: isEvenNumber(currentColIndex) ? Emojis.INFO_COW : Emojis.INFO_BEAR,
        value
      }

      currentColIndex++;
      if (currentColIndex >= len) {
        currentColIndex = 0;
        currentRowIndex--;
        isNextLine = true;
      }
    } else {
      isPositive = false;
    }
  } else {
    if (currentRowIndex < len) {
      const {
        rowIndex,
        colIndex,
        cacheStatus,
        isMine,
        emoji,
        value
      } = matrix[currentRowIndex][currentColIndex];

      matrix[currentRowIndex][currentColIndex] = {
        rowIndex,
        colIndex,
        cacheStatus,
        status: cacheStatus,
        isMine,
        isEmoji: false,
        emoji,
        value
      }

      currentColIndex--;
      if (currentColIndex < 0) {
        currentColIndex = len - 1;
        currentRowIndex++;
        isNextLine = true;
      }
    } else {
      isPositive = true;
    }
  }
  return {
    matrix: JSON.parse(JSON.stringify(matrix)),
    rowIndex: currentRowIndex,
    colIndex: currentColIndex,
    isNextLine,
    isPositive
  }
}
