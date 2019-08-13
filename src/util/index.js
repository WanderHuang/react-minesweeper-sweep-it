/**
 * 等级分布
 * 0 - easy   - 8 * 8   - 10
 * 1 - medium - 12 * 12 - 20
 * 2 - hard   - 16 * 16 - 30
 * 3 - super  - 20 * 20 - 40
 */
export const mapLevel = [
  {
    baseCount: 8,
    mineCount: 10
  },
  {
    baseCount: 12,
    mineCount: 20
  },
  {
    baseCount: 16,
    mineCount: 30
  },
  {
    baseCount: 20,
    mineCount: 40
  }
]
/**
 * 定义方块状态
 * 0 未翻开
 * 1 翻开 且为空
 * 2 翻开 且为数字
 * 3 翻开 且为地雷
 * 4 未翻开 且被标记
 */
export const CellTypes = {
  CELL_NOT_REVEAL: 0,
  CELL_NULL: 1,
  CELL_NUMBER: 2,
  CELL_MINE: 3,
  CELL_FLAG: 4
}

/**
 * 定义游戏状态
 * 0 未开始
 * 1 游戏开始
 * 2 游戏暂停
 * 3 游戏继续
 * 4 游戏失败
 * 5 游戏成功
 */
export const GameStatus = {
  GAME_NOT_START: 0,
  GAME_ON: 1,
  GAME_PAUSED: 2,
  GAME_CONTINUED: 3,
  GAME_FAILED: 4,
  GAME_SUCCESS: 5
}

/**
 * 定义游戏等级
 * 0 简单
 * 1 中级
 * 2 困难
 * 3 超难
 */
export const GameLevel = {
  SIMPLE: 0,
  MEDIUM: 1,
  HARD: 2,
  SUPER: 3
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
  const around = [cell];
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